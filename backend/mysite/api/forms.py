# forms.py
from django import forms
from .models import Usuarios


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
