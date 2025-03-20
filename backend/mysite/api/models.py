from django.db import models

# Create your models here.


class Area(models.Model):
    idarea = models.AutoField(primary_key=True)
    nombrearea = models.CharField(max_length=50)
    descripcionarea = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)
    idunidades = models.ForeignKey('Unidades', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'area'


class Articulos(models.Model):
    idarticulo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    revista = models.CharField(max_length=30)
    pais = models.CharField(max_length=20)
    aniopublicacion = models.DateField()
    url = models.TextField(blank=True, null=True)
    doi = models.CharField(max_length=25)

    class Meta:
        managed = False
        db_table = 'articulos'


class Carreras(models.Model):
    idcarreras = models.AutoField(primary_key=True)
    nombrecarrera = models.CharField(max_length=40)
    nombreuniversidad = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'carreras'


class DetArt(models.Model):
    iddetart = models.AutoField(primary_key=True)
    idarticulo = models.ForeignKey('Articulos', on_delete=models.CASCADE)
    idinvestigadores = models.ForeignKey(
        'Investigadores', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'detart'


class DetEventos(models.Model):
    iddeteventos = models.AutoField(primary_key=True)
    idinvestigadores = models.ForeignKey(
        'Investigadores', on_delete=models.CASCADE)
    idevento = models.ForeignKey('Eventos', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'deteventos'


class DetHerramienta(models.Model):
    iddetherramienta = models.AutoField(primary_key=True)
    idproyecto = models.ForeignKey('Proyectos', on_delete=models.CASCADE)
    idherramientas = models.ForeignKey(
        'Herramientas', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'detherramienta'


class DetLineas(models.Model):
    iddetlineas = models.AutoField(primary_key=True)
    idlineas = models.ForeignKey('Lineas', on_delete=models.CASCADE)
    idinvestigadores = models.ForeignKey(
        'Investigadores', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'detlineas'


class DetProy(models.Model):
    iddetproy = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=20)
    idinvestigadores = models.ForeignKey(
        'Investigadores', on_delete=models.CASCADE)
    idproyecto = models.ForeignKey('Proyectos', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'detproy'


class Especialidades(models.Model):
    idespecialidades = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)

    class Meta:
        managed = False
        db_table = 'especialidades'


class Estudiantes(models.Model):
    idestudiantes = models.AutoField(primary_key=True)
    nombreestudiante = models.CharField(max_length=50)
    apellidoestudiante = models.CharField(max_length=50)
    emailestudiante = models.CharField(max_length=50)
    telefonoestudiante = models.CharField(max_length=20)
    fechaingreso = models.DateField()
    fechafincontrato = models.DateField()
    estatus = models.BooleanField(default=True)
    idtipoestudiante = models.ForeignKey(
        'TipoEstudiante', on_delete=models.CASCADE)
    idcarreras = models.ForeignKey('Carreras', on_delete=models.CASCADE)
    idinvestigadores = models.ForeignKey(
        'Investigadores', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'estudiantes'


class Eventos(models.Model):
    idevento = models.AutoField(primary_key=True)
    nombreevento = models.CharField(max_length=100)
    lugarevento = models.CharField(max_length=100)
    fechaevento = models.DateField()
    duracionevento = models.CharField(max_length=50, blank=True, null=True)
    empresainvitante = models.CharField(max_length=100, blank=True, null=True)
    idtipoevento = models.ForeignKey('TipoEvento', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'eventos'


class Herramientas(models.Model):
    idherramientas = models.AutoField(primary_key=True)
    nombreherramienta = models.CharField(max_length=255)
    tipoherramienta = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'herramientas'


class Investigadores(models.Model):
    idinvestigadores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.CharField(max_length=50)
    puesto = models.CharField(max_length=50)
    idniveledu = models.ForeignKey('NivelEdu', on_delete=models.CASCADE)
    idarea = models.ForeignKey('Area', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'investigadores'


class Lineas(models.Model):
    idlineas = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    fechaapertura = models.DateField()
    estatus = models.BooleanField(default=True)

    class Meta:
        managed = False
        db_table = 'lineas'


class NivelEdu(models.Model):
    idniveledu = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)
    idespecialidades = models.ForeignKey(
        'Especialidades', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'niveledu'


class NivelSni(models.Model):
    idnivelsni = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'nivelsni'


class Permisos(models.Model):
    idpermiso = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=20)
    rol = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'permisos'


class Proyectos(models.Model):
    idproyecto = models.AutoField(primary_key=True)
    nombreproyecto = models.CharField(max_length=255)
    descripcionproyecto = models.TextField(blank=True, null=True)
    fechainicio = models.DateField()
    fechatermino = models.DateField()

    class Meta:
        managed = False
        db_table = 'proyectos'


class Sni(models.Model):
    idsni = models.AutoField(primary_key=True)
    fechaingreso = models.DateField()
    fecharenovacion = models.DateField()
    idnivelsni = models.ForeignKey('NivelSni', on_delete=models.CASCADE)
    idinvestigadores = models.ForeignKey(
        'Investigadores', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'sni'


class TipoEstudiante(models.Model):
    idtipoestudiante = models.AutoField(primary_key=True)
    descripcionestudiante = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'tipoestudiante'


class TipoEvento(models.Model):
    idtipoevento = models.AutoField(primary_key=True)
    nombreevento = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'tipoevento'


class Unidades(models.Model):
    idunidades = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
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

    class Meta:
        managed = False
        db_table = 'usuarios'

    def __str__(self):
        return self.correo
