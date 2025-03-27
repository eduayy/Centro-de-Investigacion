# forms.py
from .models import Estudiantes
from .models import Estudiantes, Carreras, Investigadores
from django import forms
from .models import Usuarios, Estudiantes, TipoEstudiante


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

   # api/forms.py


# En forms.py

# En forms.py
# En forms.py


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
