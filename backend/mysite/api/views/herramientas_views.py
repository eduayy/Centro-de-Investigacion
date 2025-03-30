from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Herramientas
from ..forms import HerramientaForm


def lista_herramientas(request):
    herramientas = Herramientas.objects.all().order_by('idherramientas')
    return render(request, 'herramientas/lista_herramientas.html', {
        'herramientas': herramientas,
        'titulo': 'Listado de Herramientas'
    })


def alta_herramienta(request):
    if request.method == 'POST':
        form = HerramientaForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultima_herramienta = Herramientas.objects.order_by(
                    '-idherramientas').first()
                nuevo_id = ultima_herramienta.idherramientas + 1 if ultima_herramienta else 1

                herramienta = form.save(commit=False)
                herramienta.idherramientas = nuevo_id
                herramienta.save()

                messages.success(
                    request, f'Herramienta creada con ID {nuevo_id}')
                return redirect('lista_herramientas')
            except Exception as e:
                messages.error(
                    request, f'Error al crear herramienta: {str(e)}')
    else:
        form = HerramientaForm()

    return render(request, 'herramientas/alta_herramienta.html', {
        'form': form,
        'titulo': 'Nueva Herramienta'
    })


def editar_herramienta(request, pk):
    herramienta = get_object_or_404(Herramientas, pk=pk)
    if request.method == 'POST':
        form = HerramientaForm(request.POST, instance=herramienta)
        if form.is_valid():
            form.save()
            messages.success(request, 'Herramienta actualizada')
            return redirect('lista_herramientas')
    else:
        form = HerramientaForm(instance=herramienta)
    return render(request, 'herramientas/editar_herramienta.html', {
        'form': form,
        'herramienta': herramienta,
        'titulo': f'Editar: {herramienta.nombreherramienta}'
    })


def baja_herramienta(request, pk):
    herramienta = get_object_or_404(Herramientas, idherramientas=pk)
    if request.method == 'POST':
        try:
            herramienta.delete()
            messages.success(request, 'Herramienta eliminada')
        except Exception as e:
            messages.error(request, f'Error: {str(e)}')
    return redirect('lista_herramientas')
