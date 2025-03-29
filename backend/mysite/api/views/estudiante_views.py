from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Estudiantes, Usuarios
from ..forms import EstudianteForm
from .auth_views import permiso_requerido


def lista_estudiantes(request):
    estudiantes = Estudiantes.objects.filter(estatus=True)
    usuario = Usuarios.objects.get(idusuario=request.session['usuario_id'])
    return render(request, 'estudiantes/lista_estudiantes.html', {
        'estudiantes': estudiantes,
        'titulo': 'Listado de Estudiantes Activos',
        'puede_crear_estudiante': True,
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
