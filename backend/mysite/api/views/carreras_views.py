from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Carreras
from ..forms import CarreraForm


def lista_carreras(request):
    carreras = Carreras.objects.all().order_by('idcarreras')
    return render(request, 'carreras/lista_carreras.html', {
        'carreras': carreras,
        'titulo': 'Listado de Carreras'
    })


def alta_carrera(request):
    if request.method == 'POST':
        form = CarreraForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultima_carrera = Carreras.objects.order_by(
                    '-idcarreras').first()
                nuevo_id = ultima_carrera.idcarreras + 1 if ultima_carrera else 1

                carrera = form.save(commit=False)
                carrera.idcarreras = nuevo_id
                carrera.save()

                messages.success(request, f'Carrera creada con ID {nuevo_id}')
                return redirect('lista_carreras')
            except Exception as e:
                messages.error(request, f'Error al crear carrera: {str(e)}')
    else:
        form = CarreraForm()

    return render(request, 'carreras/alta_carrera.html', {
        'form': form,
        'titulo': 'Nueva Carrera'
    })


def editar_carrera(request, pk):
    carrera = get_object_or_404(Carreras, pk=pk)
    if request.method == 'POST':
        form = CarreraForm(request.POST, instance=carrera)
        if form.is_valid():
            form.save()
            messages.success(request, 'Carrera actualizada')
            return redirect('lista_carreras')
    else:
        form = CarreraForm(instance=carrera)
    return render(request, 'carreras/editar_carrera.html', {
        'form': form,
        'carrera': carrera,
        'titulo': f'Editar: {carrera.nombrecarrera}'
    })


def baja_carrera(request, pk):
    carrera = get_object_or_404(Carreras, idcarreras=pk)
    if request.method == 'POST':
        try:
            carrera.delete()
            messages.success(request, 'Carrera eliminada')
        except Exception as e:
            messages.error(request, f'Error: {str(e)}')
    return redirect('lista_carreras')
