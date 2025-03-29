from django.shortcuts import render, redirect
from django.http import HttpResponseForbidden
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Usuarios
from ..forms import LoginForm
from functools import wraps


def permiso_requerido(*roles_permitidos):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if 'usuario_id' not in request.session:
                return redirect('login')

            try:
                usuario = Usuarios.objects.get(
                    idusuario=request.session['usuario_id'])
                if usuario.idpermiso.rol in roles_permitidos:
                    return view_func(request, *args, **kwargs)
                messages.error(request, 'No tiene permisos para esta acción')
                return redirect('inicio')
            except Usuarios.DoesNotExist:
                return redirect('login')
        return _wrapped_view
    return decorator


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

    try:
        usuario = Usuarios.objects.filter(
            correo=correo, contrasena=contrasena).first()
        request.session['usuario_id'] = usuario.idusuario
        request.session['rol'] = usuario.idpermiso.rol
        return Response({
            'status': 'success',
            'usuario_id': usuario.idusuario,
            'nombre': usuario.nombre,
            'rol': usuario.idpermiso.rol,
            'permisos': {
                'puede_crear_estudiante': usuario.idpermiso.rol in [1, 2],
                'puede_editar_estudiante': usuario.idpermiso.rol in [1, 2],
                'puede_eliminar_estudiante': usuario.idpermiso.rol in [1, 2],
                'es_admin': usuario.idpermiso.rol == 1
            }
        }, status=status.HTTP_200_OK)
    except Usuarios.DoesNotExist:
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
        'puede_crear_estudiante': usuario.idpermiso.rol in [1, 2],
        'puede_editar_estudiante': usuario.idpermiso.rol in [1, 2],
        'puede_eliminar_estudiante': usuario.idpermiso.rol in [1, 2]
    })


def logout_view(request):
    if 'usuario_id' in request.session:
        del request.session['usuario_id']
    return redirect('login')
