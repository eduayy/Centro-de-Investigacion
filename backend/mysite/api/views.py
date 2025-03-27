from django.shortcuts import render, redirect, get_object_or_404
from .forms import LoginForm, EstudianteForm
from .utils import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Usuarios, Estudiantes
from .serializers import EstudiantesSerializer

# Vista tradicional


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

# Endpoint


@api_view(['POST'])
def login_api(request):
    correo = request.data.get('correo')
    contrasena = request.data.get('contrasena')

    try:
        usuario = Usuarios.objects.get(correo=correo, contrasena=contrasena)
        # Mantener sesión
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

# endpoind para tabla estudiantes


class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiantes.objects.all()
    serializer_class = EstudiantesSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.estatus = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


def lista_estudiantes(request):
    estudiantes = Estudiantes.objects.all()
    return render(request, 'estudiantes/lista_estudiantes.html', {'estudiantes': estudiantes})


def alta_estudiante(request):
    if request.method == 'POST':
        form = EstudianteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_estudiantes')
    else:
        form = EstudianteForm()

    return render(request, 'estudiantes/alta_estudiante.html', {'form': form})


def editar_estudiante(request, pk):
    estudiante = get_object_or_404(Estudiantes, pk=pk)
    if request.method == 'POST':
        form = EstudianteForm(request.POST, instance=estudiante)
        if form.is_valid():
            form.save()
            return redirect('lista_estudiantes')
    else:
        form = EstudianteForm(instance=estudiante)
    return render(request, 'estudiantes/editar_estudiante.html', {'form': form, 'estudiante': estudiante})


def baja_estudiante(request, pk):
    estudiante = get_object_or_404(Estudiantes, pk=pk)
    estudiante.estatus = False
    estudiante.save()
    return redirect('lista_estudiantes')
