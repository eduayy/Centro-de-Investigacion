from .models import Eventos
from .models import Lineas
from django import forms
from .models import Usuarios, Estudiantes, Proyectos, Area, Especialidades, Eventos, Articulos, Unidades, Herramientas, Carreras, Investigadores
# Login


class LoginForm(forms.Form):
    correo = forms.CharField(label='Correo electrónico')
    contrasena = forms.CharField(
        label='Contraseña',
        widget=forms.PasswordInput
    )

    def clean(self):
        cleaned_data = super().clean()
        correo = cleaned_data.get('correo')
        contrasena = cleaned_data.get('contrasena')

        if correo and contrasena:
            try:

                usuario = Usuarios.objects.get(
                    correo=correo)

                if usuario.contrasena != contrasena:
                    raise forms.ValidationError("Credenciales incorrectas")

                cleaned_data['usuario'] = usuario
            except Usuarios.DoesNotExist:
                raise forms.ValidationError("Usuario no existe")

        return cleaned_data

# Estudiantes


class EstudianteForm(forms.ModelForm):
    class Meta:
        model = Estudiantes
        fields = '__all__'
        widgets = {
            'idcarreras': forms.Select(attrs={'class': 'form-control'}),
            'idinvestigadores': forms.Select(attrs={'class': 'form-control'}),
            'fechaingreso': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'fechafincontrato': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }
        labels = {
            'idcarreras': 'Carrera Universitaria',
            'idinvestigadores': 'Investigador Asignado',
        }

# Proyectos


class ProyectoForm(forms.ModelForm):
    class Meta:
        model = Proyectos
        fields = '__all__'
        widgets = {
            'fechainicio': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'fechatermino': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }

# Áreas


class AreaForm(forms.ModelForm):
    class Meta:
        model = Area
        fields = '__all__'
        widgets = {
            'nombrearea': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcionarea': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }
        labels = {
            'nombrearea': 'Nombre del Área',
            'descripcionarea': 'Descripción',
            'idunidades': 'Unidad asociada',
        }

# Especialidades


class EspecialidadForm(forms.ModelForm):
    class Meta:
        model = Especialidades
        fields = '__all__'
        widgets = {
            'descripcion': forms.TextInput(attrs={'class': 'form-control'}),
            'estatus': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
        labels = {
            'descripcion': 'Descripción',
            'estatus': 'Activo',
        }

# lineas


class LineaForm(forms.ModelForm):
    class Meta:
        model = Lineas
        fields = '__all__'
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcion': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3
            }),
            'fechaapertura': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control'
            }),
            'estatus': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }
        labels = {
            'nombre': 'Nombre de la Línea',
            'descripcion': 'Descripción',
            'fechaapertura': 'Fecha de Apertura',
            'estatus': 'Activa',
        }

# eventos


class EventoForm(forms.ModelForm):
    class Meta:
        model = Eventos
        fields = '__all__'
        widgets = {
            'nombreevento': forms.TextInput(attrs={'class': 'form-control'}),
            'lugarevento': forms.TextInput(attrs={'class': 'form-control'}),
            'fechaevento': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control'
            }),
            'duracionevento': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ej: 2 horas'
            }),
            'empresainvitante': forms.TextInput(attrs={'class': 'form-control'}),
            'idtipoevento': forms.Select(attrs={'class': 'form-control'}),
        }
        labels = {
            'nombreevento': 'Nombre del Evento',
            'lugarevento': 'Lugar',
            'fechaevento': 'Fecha',
            'duracionevento': 'Duración',
            'empresainvitante': 'Empresa Invitante',
            'idtipoevento': 'Tipo de Evento',
        }

# Artículos


class ArticuloForm(forms.ModelForm):
    class Meta:
        model = Articulos
        fields = '__all__'
        widgets = {
            'aniopublicacion': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'url': forms.URLInput(attrs={'class': 'form-control'}),
            'doi': forms.TextInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'nombre': 'Título del artículo',
            'revista': 'Revista/publicación',
            'pais': 'País de publicación',
            'aniopublicacion': 'Año de publicación',
            'doi': 'DOI',
        }

# Unidades


class UnidadForm(forms.ModelForm):
    class Meta:
        model = Unidades
        fields = '__all__'
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'nombre': 'Nombre de la Unidad',
        }

# Herramientas


class HerramientaForm(forms.ModelForm):
    TIPO_CHOICES = [
        ('', 'Seleccione un tipo'),
        ('software', 'Software'),
        ('hardware', 'Hardware'),
        ('laboratorio', 'Equipo de Laboratorio'),
        ('otro', 'Otro'),
    ]

    tipoherramienta = forms.ChoiceField(
        choices=TIPO_CHOICES,
        widget=forms.Select(attrs={'class': 'form-control'})
    )

    class Meta:
        model = Herramientas
        fields = '__all__'
        widgets = {
            'nombreherramienta': forms.TextInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'nombreherramienta': 'Nombre de la Herramienta',
            'tipoherramienta': 'Tipo de Herramienta',
        }

# Carreras


class CarreraForm(forms.ModelForm):
    class Meta:
        model = Carreras
        fields = '__all__'
        widgets = {
            'nombrecarrera': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ej: Ingeniería en Sistemas'
            }),
            'nombreuniversidad': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ej: Universidad Nacional'
            }),
        }
        labels = {
            'nombrecarrera': 'Nombre de la Carrera',
            'nombreuniversidad': 'Universidad',
        }

# investigadores


class InvestigadorForm(forms.ModelForm):
    class Meta:
        model = Investigadores
        fields = '__all__'
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'puesto': forms.TextInput(attrs={'class': 'form-control'}),
            'idniveledu': forms.Select(attrs={'class': 'form-control'}),
            'idarea': forms.Select(attrs={'class': 'form-control'}),
        }
        labels = {
            'idniveledu': 'Nivel Educativo',
            'idarea': 'Área de Investigación'
        }
