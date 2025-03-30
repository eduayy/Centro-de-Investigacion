from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Especialidades
from ..forms import EspecialidadForm


def lista_especialidades(request):
    especialidades = Especialidades.objects.all().order_by('idespecialidades')
    return render(request, 'especialidades/lista_especialidades.html', {
        'especialidades': especialidades,
        'titulo': 'Listado de Especialidades'
    })


def alta_especialidad(request):
    if request.method == 'POST':
        form = EspecialidadForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultima_especialidad = Especialidades.objects.order_by(
                    '-idespecialidades').first()
                nuevo_id = ultima_especialidad.idespecialidades + 1 if ultima_especialidad else 1

                # Guardar con el nuevo ID
                especialidad = form.save(commit=False)
                especialidad.idespecialidades = nuevo_id
                especialidad.save()

                messages.success(
                    request, f'Especialidad creada con ID {nuevo_id}')
                return redirect('lista_especialidades')
            except Exception as e:
                messages.error(
                    request, f'Error al crear especialidad: {str(e)}')
    else:
        form = EspecialidadForm()

    return render(request, 'especialidades/alta_especialidad.html', {
        'form': form,
        'titulo': 'Nueva Especialidad'
    })


def editar_especialidad(request, pk):
    especialidad = get_object_or_404(Especialidades, idespecialidades=pk)
    if request.method == 'POST':
        form = EspecialidadForm(request.POST, instance=especialidad)
        if form.is_valid():
            form.save()
            messages.success(request, 'Especialidad actualizada')
            return redirect('lista_especialidades')
    else:
        form = EspecialidadForm(instance=especialidad)
    return render(request, 'especialidades/editar_especialidad.html', {
        'form': form,
        'especialidad': especialidad,
        'titulo': f'Editar: {especialidad.descripcion}'
    })


def baja_especialidad(request, pk):
    print(f"Método recibido: {request.method}")
    print(f"ID recibido: {pk}")
    especialidad = get_object_or_404(Especialidades, idespecialidades=pk)
    print(f"Especialidad encontrada: {especialidad}")

    if request.method == 'POST':
        print("Procesando POST...")
        try:
            especialidad.delete()
            print("Especialidad eliminada")
            messages.success(request, 'Especialidad eliminada')
        except Exception as e:
            print(f"Error: {str(e)}")
            messages.error(request, f'Error: {str(e)}')

    return redirect('lista_especialidades')
