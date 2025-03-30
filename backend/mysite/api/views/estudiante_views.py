from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Estudiantes
from ..forms import EstudianteForm


def lista_estudiantes(request):
    if 'usuario_id' not in request.session:
        return redirect('login')
    estudiantes = Estudiantes.objects.filter(estatus=True)
    return render(request, 'estudiantes/lista_estudiantes.html', {
        'estudiantes': estudiantes,
        'titulo': 'Listado de Estudiantes Activos',
        'puede_crear_estudiante': True,
        'puede_editar': True,
        'puede_eliminar': True
    })


def alta_estudiante(request):
    if 'usuario_id' not in request.session:
        return redirect('login')
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


def editar_estudiante(request, pk):
    if 'usuario_id' not in request.session:
        return redirect('login')
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


def baja_estudiante(request, pk):
    if 'usuario_id' not in request.session:
        return redirect('login')
    if request.method == 'POST':
        estudiante = get_object_or_404(Estudiantes, pk=pk)
        if estudiante.dar_de_baja():
            messages.success(request, 'Estudiante dado de baja correctamente')
        else:
            messages.error(request, 'Error al dar de baja al estudiante')
    return redirect('lista_estudiantes')
