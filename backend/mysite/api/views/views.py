from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseForbidden
from .forms import LoginForm, EstudianteForm
from .utils import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated
from .models import Usuarios, Estudiantes
from .serializers import EstudiantesSerializer
from django.contrib import messages
from functools import wraps

# Decorador personalizado para permisos en vistas normales


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

# Permiso personalizado para DRF


class PermisosEstudiantes(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.idpermiso.rol in [1, 2]

# Vista tradicional


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            usuario = form.cleaned_data['usuario']
            request.session['usuario_id'] = usuario.idusuario
            request.session['rol'] = usuario.idpermiso.rol
            return redirect('inicio')
        else:
            return render(request, 'login.html', {'form': form})
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})

# Endpoint


@api_view(['POST'])
def login_api(request):
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')

    try:
        usuario = Usuarios.objects.get(correo=correo, contrasena=contrasena)
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


@login_required
def vista_protegida(request):
    return render(request, 'inicio.html')

# Vistas para estudiantes


def lista_estudiantes(request):
    estudiantes = Estudiantes.objects.filter(estatus=True)
    usuario = Usuarios.objects.get(idusuario=request.session['usuario_id'])
    return render(request, 'estudiantes/lista_estudiantes.html', {
        'estudiantes': estudiantes,
        'titulo': 'Listado de Estudiantes Activos',
        'puede_editar': usuario.idpermiso.rol in [1, 2],
        'puede_eliminar': usuario.idpermiso.rol in [1, 2]
    })


@permiso_requerido(1, 2)
def alta_estudiante(request):
    if request.method == 'POST':
        form = EstudianteForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Estudiante registrado correctamente')
            return redirect('lista_estudiantes')
    else:
        form = EstudianteForm()

    return render(request, 'estudiantes/alta_estudiante.html', {
        'form': form,
        'titulo': 'Registrar Nuevo Estudiante'
    })


@permiso_requerido(1, 2)
def editar_estudiante(request, pk):
    estudiante = get_object_or_404(Estudiantes, pk=pk)
    if request.method == 'POST':
        form = EstudianteForm(request.POST, instance=estudiante)
        if form.is_valid():
            form.save()
            messages.success(request, 'Datos del estudiante actualizados')
            return redirect('lista_estudiantes')
    else:
        form = EstudianteForm(instance=estudiante)

    return render(request, 'estudiantes/editar_estudiante.html', {
        'form': form,
        'estudiante': estudiante,
        'titulo': f'Editar Estudiante: {estudiante}'
    })


@permiso_requerido(1, 2)
def baja_estudiante(request, pk):
    if request.method == 'POST':
        estudiante = get_object_or_404(Estudiantes, pk=pk)
        if estudiante.dar_de_baja():
            messages.success(request, 'Estudiante dado de baja correctamente')
        else:
            messages.error(request, 'Error al dar de baja al estudiante')
    return redirect('lista_estudiantes')

# ViewSet para API


class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiantes.objects.filter(estatus=True)
    serializer_class = EstudiantesSerializer
    permission_classes = [IsAuthenticated, PermisosEstudiantes]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.dar_de_baja():
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"detail": "No se pudo realizar la baja"},
            status=status.HTTP_400_BAD_REQUEST
        )
