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
        db_column='idunidades'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'area'


def save(self, *args, **kwargs):
    if not self.idarea:
        max_id = Area.objects.aggregate(max_id=Max('idarea'))['max_id']
        self.idarea = (max_id or 0) + 1
    super().save(*args, **kwargs)


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
        managed = False
        db_table = 'articulos'


def save(self, *args, **kwargs):
    if not self.idarticulo:
        max_id = Articulos.objects.aggregate(
            max_id=Max('idarticulo'))['max_id']
        self.idarticulo = (max_id or 0) + 1
    super().save(*args, **kwargs)


class Carreras(models.Model):
    idcarreras = models.AutoField(primary_key=True)
    nombrecarrera = models.CharField(max_length=40)
    nombreuniversidad = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'carreras'

    def __str__(self):
        return f"{self.nombrecarrera} ({self.nombreuniversidad})"


def save(self, *args, **kwargs):

    if not self.idcarreras:
        max_id = Carreras.objects.aggregate(max_id=Max('idcarreras'))['max_id']
        self.idcarreras = (max_id or 0) + 1
    super().save(*args, **kwargs)


class DetArt(models.Model):
    iddetart = models.AutoField(primary_key=True)
    idarticulo = models.ForeignKey(
        'Articulos',
        on_delete=models.CASCADE,
        db_column='idarticulo'
    )
    idinvestigador = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores'
    )
    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'detart'


class DetEventos(models.Model):
    iddeteventos = models.AutoField(primary_key=True)
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores'
    )
    idevento = models.ForeignKey(
        'Eventos',
        on_delete=models.CASCADE,
        db_column='idevento'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'deteventos'
        verbose_name = 'Detalle de Evento'
        verbose_name_plural = 'Detalles de Eventos'


class DetHerramienta(models.Model):
    iddetherramienta = models.AutoField(primary_key=True)
    idproyecto = models.ForeignKey(
        'Proyectos',
        on_delete=models.CASCADE,
        db_column='idproyecto'
    )
    idherramientas = models.ForeignKey(
        'Herramientas',
        on_delete=models.CASCADE,
        db_column='idherramientas'
    )

    class Meta:
        managed = False
        db_table = 'detherramienta'


class DetLineas(models.Model):
    iddetlineas = models.AutoField(primary_key=True)
    idlineas = models.ForeignKey(
        'Lineas',
        on_delete=models.CASCADE,
        db_column='idlineas'
    )
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'detlineas'


class DetProy(models.Model):
    iddetproy = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=20)
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores'
    )
    idproyecto = models.ForeignKey(
        'Proyectos',
        on_delete=models.CASCADE,
        db_column='idproyecto'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'detproy'


class Especialidades(models.Model):
    idespecialidades = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'especialidades'


def save(self, *args, **kwargs):
    if not self.idespecialidades:
        max_id = Especialidades.objects.aggregate(
            max_id=Max('idespecialidades'))['max_id']
        self.idespecialidades = (max_id or 0) + 1
    super().save(*args, **kwargs)


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

    # Claves foráneas
    idtipoestudiante = models.ForeignKey(
        'TipoEstudiante',
        on_delete=models.CASCADE,
        db_column='idtipoestudiante'
    )
    idcarreras = models.ForeignKey(
        'Carreras',
        on_delete=models.CASCADE,
        db_column='idcarreras'
    )
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'estudiantes'

    def __str__(self):
        return f"{self.nombreestudiante} {self.apellidoestudiante}"

    def save(self, *args, **kwargs):
        if not self.idestudiantes:
            # Obtener el máximo ID actual y sumar 1
            max_id = Estudiantes.objects.aggregate(
                max_id=Max('idestudiantes'))['max_id']
            self.idestudiantes = (max_id or 0) + 1
        super().save(*args, **kwargs)

    def dar_de_baja(self):
        """Método para baja lógica que funciona con managed=False"""
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE estudiantes SET estatus = %s WHERE idestudiantes = %s",
                    [False, self.idestudiantes]
                )
            return True
        except Exception as e:
            print(f"Error al dar de baja: {str(e)}")
            return False


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
        db_column='idtipoevento'
    )

    class Meta:
        managed = False
        db_table = 'eventos'

    def __str__(self):
        return self.nombreevento


def save(self, *args, **kwargs):
    if not self.idevento:
        max_id = Eventos.objects.aggregate(
            max_id=Max('idevento'))['max_id']
        self.idevento = (max_id or 0) + 1
    super().save(*args, **kwargs)


class Herramientas(models.Model):
    idherramientas = models.AutoField(primary_key=True)
    nombreherramienta = models.CharField(max_length=255)
    tipoherramienta = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'herramientas'


def save(self, *args, **kwargs):
    if not self.idherramientas:
        max_id = Herramientas.objects.aggregate(
            max_id=Max('idherramientas'))['max_id']
        self.idherramientas = (max_id or 0) + 1
    super().save(*args, **kwargs)


class Investigadores(models.Model):
    idinvestigadores = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    puesto = models.CharField(max_length=50, default="Investigador")
    idniveledu = models.ForeignKey(
        'NivelEdu', on_delete=models.CASCADE, db_column='idniveledu')
    idarea = models.ForeignKey(
        'Area', on_delete=models.CASCADE, db_column='idarea')

    class Meta:
        managed = False
        db_table = 'investigadores'

    def __str__(self):
        return f"{self.nombre}"


def save(self, *args, **kwargs):

    if not self.idinvestigadores:
        max_id = Investigadores.objects.aggregate(
            max_id=Max('idinvestigadores'))['max_id']
        self.idinvestigadores = (max_id or 0) + 1
    super().save(*args, **kwargs)


class Lineas(models.Model):
    idlineas = models.AutoField(primary_key=True, db_column='idlineas')
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100, blank=True, null=True)
    fechaapertura = models.DateField()
    estatus = models.BooleanField(default=True)

    class Meta:
        managed = False
        db_table = 'lineas'

    def __str__(self):
        return self.nombre


def save(self, *args, **kwargs):
    if not self.idlineas:
        max_id = Lineas.objects.aggregate(
            max_id=Max('idlineas'))['max_id']
        self.idlineas = (max_id or 0) + 1
    super().save(*args, **kwargs)


class NivelEdu(models.Model):
    idniveledu = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=100)
    estatus = models.BooleanField(default=True)
    idespecialidades = models.ForeignKey(
        'Especialidades',
        on_delete=models.CASCADE,
        db_column='idespecialidades'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
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
        managed = False
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
        managed = False
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
        managed = False
        db_table = 'proyectos'


def save(self, *args, **kwargs):

    if not self.idproyecto:
        max_id = Proyectos.objects.aggregate(
            max_id=Max('idproyecto'))['max_id']
        self.idproyecto = (max_id or 0) + 1
    super().save(*args, **kwargs)


class Sni(models.Model):
    idsni = models.AutoField(primary_key=True)
    fechaingreso = models.DateField()
    fecharenovacion = models.DateField()
    idnivelsni = models.ForeignKey(
        'NivelSni',
        on_delete=models.CASCADE,
        db_column='idnivelsni'
    )
    idinvestigadores = models.ForeignKey(
        'Investigadores',
        on_delete=models.CASCADE,
        db_column='idinvestigadores'
    )

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'sni'


class TipoEstudiante(models.Model):
    idtipoestudiante = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=255)

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'tipoestudiante'
        verbose_name_plural = 'Tipos de Estudiante'

    def __str__(self):
        return self.descripcion


class TipoEvento(models.Model):
    idtipoevento = models.AutoField(primary_key=True)
    nombreevento = models.CharField(max_length=50)

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'tipoevento'


class Unidades(models.Model):
    idunidades = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    objects = SafeGetManager()

    class Meta:
        managed = False
        db_table = 'unidades'


def save(self, *args, **kwargs):
    if not self.idunidades:
        max_id = Unidades.objects.aggregate(max_id=Max('idunidades'))['max_id']
        self.idunidades = (max_id or 0) + 1
    super().save(*args, **kwargs)


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
        managed = False
        db_table = 'usuarios'

    def __str__(self):
        return self.correo
