# Generated by Django 5.1.7 on 2025-03-27 08:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_estudiantes_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tipoestudiante',
            options={'managed': False, 'verbose_name_plural': 'Tipos de Estudiante'},
        ),
    ]
