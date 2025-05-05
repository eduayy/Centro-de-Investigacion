from django.db import connection
from django.db import models
from django.db.models import Max


# Create your models here.


class SafeGetManager(models.Manager):
    def get(self, **kwargs):
        try:
            return super().get(**kwargs)
        except self.model.MultipleObjectsReturned:
            # Ordenar por ID y tomar el primero
            return self.filter(**kwargs).order_by('id').first()


class Area(models.Model):
    idarea = models.AutoField(primary_key=True)
    nombrearea = models.CharField(max_length=50)
    descripcionarea = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)
    idunidades = models.ForeignKey(
        'Unidades',
        on_delete=models.CASCADE,
        db_column='idunidades',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'area'

    


class Articulos(models.Model):
    idarticulo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    revista = models.CharField(max_length=30)
    pais = models.CharField(max_length=20)
    aniopublicacion = models.DateField()
    url = models.TextField(blank=True, null=True)
    doi = models.CharField(max_length=25)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'articulos'

   


class Carreras(models.Model):
    idcarreras = models.AutoField(primary_key=True)
    nombrecarrera = models.CharField(max_length=40)
    nombreuniversidad = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'carreras'

    def __str__(self):
        return f"{self.nombrecarrera} ({self.nombreuniversidad})"



class DetArt(models.Model):
    iddetart = models.AutoField(primary_key=True)
    idarticulo = models.ForeignKey(
        'Articulos',
        on_delete=models.CASCADE,
        db_column='idarticulo',
        default=1
    )
    idinvestigador = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores',
        default=1
    )
    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'detart'


class DetEventos(models.Model):
    iddeteventos = models.AutoField(primary_key=True)
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores',
        default=1
    )
    idevento = models.ForeignKey(
        'Eventos',
        on_delete=models.CASCADE,
        db_column='idevento',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'deteventos'
        verbose_name = 'Detalle de Evento'
        verbose_name_plural = 'Detalles de Eventos'


class DetHerramienta(models.Model):
    iddetherramienta = models.AutoField(primary_key=True)
    idproyecto = models.ForeignKey(
        'Proyectos',
        on_delete=models.CASCADE,
        db_column='idproyecto',
        default=1
    )
    idherramientas = models.ForeignKey(
        'Herramientas',
        on_delete=models.CASCADE,
        db_column='idherramientas',
        default=1
    )

    class Meta:
        managed = True
        db_table = 'detherramienta'


class DetLineas(models.Model):
    iddetlineas = models.AutoField(primary_key=True)
    idlineas = models.ForeignKey(
        'Lineas',
        on_delete=models.CASCADE,
        db_column='idlineas',
        default=1
    )
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'detlineas'


class DetProy(models.Model):
    iddetproy = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=20)
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores',
        default=1
    )
    idproyecto = models.ForeignKey(
        'Proyectos',
        on_delete=models.CASCADE,
        db_column='idproyecto',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'detproy'


class Especialidades(models.Model):
    idespecialidades = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'especialidades'



class Estudiantes(models.Model):
    idestudiantes = models.AutoField(primary_key=True)
    nombreestudiante = models.CharField(max_length=50)
    apellidoestudiante = models.CharField(max_length=50)
    emailestudiante = models.CharField(max_length=50)
    telefonoestudiante = models.CharField(
        max_length=20, blank=True, null=True)
    fechaingreso = models.DateField()
    fechafincontrato = models.DateField(
        blank=True, null=True)
    estatus = models.BooleanField(default=True)
    idtipoestudiante = models.ForeignKey(
        'TipoEstudiante',
        on_delete=models.CASCADE,
        db_column='idtipoestudiante',
        default=1
    )
    idcarreras = models.ForeignKey(
        'Carreras',
        on_delete=models.CASCADE,
        db_column='idcarreras',
        default=1
    )
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'estudiantes'

    def __str__(self):
        return f"{self.nombreestudiante} {self.apellidoestudiante}"

    def dar_de_baja(self):
        """Método para baja lógica que funciona con managed=True"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE estudiantes SET estatus = %s WHERE idestudiantes = %s",
                    [True, self.idestudiantes]
                )
            return True
        except Exception as e:
            print(f"Error al dar de baja: {str(e)}")
            return True


class Eventos(models.Model):
    idevento = models.AutoField(primary_key=True, db_column='idevento')
    nombreevento = models.CharField(max_length=100, db_column='nombreevento')
    lugarevento = models.CharField(max_length=100, db_column='lugarevento')
    fechaevento = models.DateField(db_column='fechaevento')
    duracionevento = models.CharField(
        max_length=50, blank=True, null=True, db_column='duracionevento')
    empresainvitante = models.CharField(
        max_length=100, blank=True, null=True, db_column='empresainvitante')

    idtipoevento = models.ForeignKey(
        'TipoEvento',
        on_delete=models.CASCADE,
        db_column='idtipoevento',
        default=1
    )

    class Meta:
        managed = True
        db_table = 'eventos'

    def __str__(self):
        return self.nombreevento

    


class Herramientas(models.Model):
    idherramientas = models.AutoField(primary_key=True)
    nombreherramienta = models.CharField(max_length=255)
    tipoherramienta = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'herramientas'


class Investigadores(models.Model):
    idinvestigadores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    puesto = models.CharField(max_length=50, default="Investigador")
    idniveledu = models.ForeignKey(
        'NivelEdu', on_delete=models.CASCADE, db_column='idniveledu', default=1)
    idarea = models.ForeignKey(
        'Area', on_delete=models.CASCADE, 
        db_column='idarea',
        default=1
        )

    class Meta:
        managed = True
        db_table = 'investigadores'

    def __str__(self):
        return f"{self.nombre}"


class Lineas(models.Model):
    idlineas = models.AutoField(primary_key=True, db_column='idlineas')
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    fechaapertura = models.DateField()
    estatus = models.BooleanField(default=True)

    class Meta:
        managed = True
        db_table = 'lineas'

    def __str__(self):
        return self.nombre


class NivelEdu(models.Model):
    idniveledu = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)
    idespecialidades = models.ForeignKey(
        'Especialidades',
        on_delete=models.CASCADE,
        db_column='idespecialidades',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'niveledu'
        verbose_name = 'Nivel Educativo'
        verbose_name_plural = 'Niveles Educativos'

    def __str__(self):
        return self.descripcion


class NivelSni(models.Model):
    idnivelsni = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'nivelsni'


class Permisos(models.Model):
    idpermiso = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=20)
    rol = models.IntegerField(choices=[
        (1, 'Administrador'),
        (2, 'Investigador'),
        (3, 'Estudiante'),
        (4, 'Usuario General')
    ])

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'permisos'

    def __str__(self):
        return self.get_rol_display()


class Proyectos(models.Model):
    idproyecto = models.AutoField(primary_key=True)
    nombreproyecto = models.CharField(max_length=255)
    descripcionproyecto = models.TextField(blank=True, null=True)
    fechainicio = models.DateField()
    fechatermino = models.DateField()

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'proyectos'


class Sni(models.Model):
    idsni = models.AutoField(primary_key=True)
    fechaingreso = models.DateField()
    fecharenovacion = models.DateField()
    idnivelsni = models.ForeignKey(
        'NivelSni',
        on_delete=models.CASCADE,
        db_column='idnivelsni',
        default=1
    )
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores',
        default=1
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'sni'


class TipoEstudiante(models.Model):
    idtipoestudiante = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=255, default="Valor por defecto")

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'tipoestudiante'
        verbose_name_plural = 'Tipos de Estudiante'

    def __str__(self):
        return self.descripcion


class TipoEvento(models.Model):
    idtipoevento = models.AutoField(primary_key=True)
    nombreevento = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'tipoevento'


class Unidades(models.Model):
    idunidades = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'unidades'



class Usuarios(models.Model):
    idusuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    correo = models.CharField(max_length=50, unique=True)
    contrasena = models.CharField(max_length=50)
    idpermiso = models.ForeignKey(
        'Permisos',
        on_delete=models.CASCADE,
        db_column='idpermiso',
        blank=True,
        null=True
    )

    objects = SafeGetManager()

    class Meta:
        managed = True
        db_table = 'usuarios'

    def __str__(self):
        return self.correo
