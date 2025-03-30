from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Unidades
from ..forms import UnidadForm


def lista_unidades(request):
    unidades = Unidades.objects.all().order_by('idunidades')
    return render(request, 'unidades/lista_unidades.html', {
        'unidades': unidades,
        'titulo': 'Listado de Unidades'
    })


def alta_unidad(request):
    if request.method == 'POST':
        form = UnidadForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultima_unidad = Unidades.objects.order_by(
                    '-idunidades').first()
                nuevo_id = ultima_unidad.idunidades + 1 if ultima_unidad else 1

                unidad = form.save(commit=False)
                unidad.idunidades = nuevo_id
                unidad.save()

                messages.success(request, f'Unidad creada con ID {nuevo_id}')
                return redirect('lista_unidades')
            except Exception as e:
                messages.error(request, f'Error al crear unidad: {str(e)}')
    else:
        form = UnidadForm()

    return render(request, 'unidades/alta_unidad.html', {
        'form': form,
        'titulo': 'Nueva Unidad'
    })


def editar_unidad(request, pk):
    unidad = get_object_or_404(Unidades, pk=pk)
    if request.method == 'POST':
        form = UnidadForm(request.POST, instance=unidad)
        if form.is_valid():
            form.save()
            messages.success(request, 'Unidad actualizada')
            return redirect('lista_unidades')
    else:
        form = UnidadForm(instance=unidad)
    return render(request, 'unidades/editar_unidad.html', {
        'form': form,
        'unidad': unidad,
        'titulo': f'Editar: {unidad.nombre}'
    })


def baja_unidad(request, pk):
    unidad = get_object_or_404(Unidades, idunidades=pk)
    if request.method == 'POST':
        try:
            unidad.delete()
            messages.success(request, 'Unidad eliminada')
        except Exception as e:
            messages.error(request, f'Error: {str(e)}')
    return redirect('lista_unidades')
