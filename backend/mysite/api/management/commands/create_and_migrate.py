import psycopg2
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Crea la BD si no existe y ejecuta migraciones'

    def handle(self, *args, **options):
        db_settings = settings.DATABASES['default']
        db_name = db_settings['NAME']
        user = db_settings['USER']
        password = db_settings['PASSWORD']
        host = db_settings['HOST']
        port = db_settings['PORT']

        # Intenta conectar a la BD
        try:
            conn = psycopg2.connect(
                dbname=db_name,
                user=user,
                password=password,
                host=host,
                port=port,
            )
            conn.close()
            self.stdout.write(self.style.SUCCESS(f'✅ La BD "{db_name}" ya existe'))
        except psycopg2.OperationalError as e:
            if 'does not exist' in str(e):
                self.stdout.write(self.style.WARNING(f'⚠️ La BD "{db_name}" no existe. Creando...'))
                # Conecta a la BD por defecto "postgres" o "template1" para crear la nueva
                try:
                    conn = psycopg2.connect(
                        dbname='postgres',  # Puedes probar con 'template1' si 'postgres' no funciona
                        user=user,
                        password=password,
                        host=host,
                        port=port,
                    )
                    conn.autocommit = True
                    cursor = conn.cursor()
                    try:
                        cursor.execute(f'CREATE DATABASE "{db_name}"')
                        self.stdout.write(self.style.SUCCESS(f'✅ BD "{db_name}" creada correctamente'))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'❌ Error al crear BD: {e}'))
                        return
                    finally:
                        cursor.close()
                        conn.close()
                except psycopg2.OperationalError as e:
                    self.stdout.write(self.style.ERROR(f'❌ No se pudo conectar a PostgreSQL para crear la base de datos: {e}'))
                    return
            else:
                self.stdout.write(self.style.ERROR(f'❌ Error de conexión: {e}'))
                return

        # Ejecuta migraciones
        self.stdout.write(self.style.WARNING('🚀 Aplicando migraciones...'))
        call_command('migrate')
