from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Usuarios
from ..forms import LoginForm


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            usuario = form.cleaned_data['usuario']
            request.session['usuario_id'] = usuario.idusuario
            request.session['rol'] = usuario.idpermiso.rol
            return redirect('inicio')
        return render(request, 'login.html', {'form': form})
    form = LoginForm()
    return render(request, 'login.html', {'form': form})


@api_view(['POST'])
def login_api(request):
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')

    usuario = Usuarios.objects.filter(
        correo=correo, contrasena=contrasena).first()
    if usuario:
        request.session['usuario_id'] = usuario.idusuario
        request.session['rol'] = usuario.idpermiso.rol
        return Response({
            'status': 'success',
            'usuario_id': usuario.idusuario,
            'nombre': usuario.nombre,
            'rol': usuario.idpermiso.rol,
            'permisos': {
                'puede_crear_estudiante': True,
                'puede_editar_estudiante': True,
                'puede_eliminar_estudiante': True,
                'es_admin': usuario.idpermiso.rol == 1
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'status': 'error',
            'message': 'Credenciales inválidas'
        }, status=status.HTTP_401_UNAUTHORIZED)


def inicio(request):
    if 'usuario_id' not in request.session:
        return redirect('login')
    usuario = Usuarios.objects.get(idusuario=request.session['usuario_id'])
    return render(request, 'inicio.html', {
        'usuario': usuario,
        'puede_crear_estudiante': True,
        'puede_editar_estudiante': True,
        'puede_eliminar_estudiante': True
    })


def logout_view(request):
    if 'usuario_id' in request.session:
        del request.session['usuario_id']
    return redirect('login')
