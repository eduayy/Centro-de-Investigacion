from django.shortcuts import render, redirect, get_object_or_404
from .forms import LoginForm
from .utils import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuarios

# Vista tradicional (para templates HTML)


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            usuario = form.cleaned_data['usuario']
            request.session['usuario_id'] = usuario.idusuario
            return redirect('inicio')
        else:
            return render(request, 'login.html', {'form': form})
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})

# Endpoint API para React (POST)


@api_view(['POST'])
def login_api(request):
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')

    try:
        usuario = Usuarios.objects.get(correo=correo, contrasena=contrasena)
        # Opcional: mantener sesión
        request.session['usuario_id'] = usuario.idusuario
        return Response({
            'status': 'success',
            'usuario_id': usuario.idusuario,
            'nombre': usuario.nombre
        }, status=status.HTTP_200_OK)

    except Usuarios.DoesNotExist:
        return Response({
            'status': 'error',
            'message': 'Credenciales inválidas'
        }, status=status.HTTP_401_UNAUTHORIZED)

# Resto de tus vistas...


def inicio(request):
    if 'usuario_id' not in request.session:
        return redirect('login')
    return render(request, 'inicio.html')


def logout_view(request):
    if 'usuario_id' in request.session:
        del request.session['usuario_id']
    return redirect('login')


@login_required
def vista_protegida(request):
    return render(request, 'inicio.html')
