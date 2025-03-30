from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Lineas
from ..forms import LineaForm


def lista_lineas(request):
    lineas = Lineas.objects.all().order_by('idlineas')
    return render(request, 'lineas/lista_lineas.html', {
        'lineas': lineas,
        'titulo': 'Listado de Líneas de Investigación'
    })


def alta_linea(request):
    if request.method == 'POST':
        form = LineaForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultima_linea = Lineas.objects.order_by('-idlineas').first()
                nuevo_id = ultima_linea.idlineas + 1 if ultima_linea else 1

                # Guardar con el nuevo ID
                linea = form.save(commit=False)
                linea.idlineas = nuevo_id
                linea.save()

                messages.success(request, f'Línea creada con ID {nuevo_id}')
                return redirect('lista_lineas')
            except Exception as e:
                messages.error(request, f'Error al crear línea: {str(e)}')
    else:
        form = LineaForm()

    return render(request, 'lineas/alta_linea.html', {
        'form': form,
        'titulo': 'Nueva Línea de Investigación'
    })


def editar_linea(request, pk):
    linea = get_object_or_404(Lineas, idlineas=pk)
    if request.method == 'POST':
        form = LineaForm(request.POST, instance=linea)
        if form.is_valid():
            form.save()
            messages.success(request, 'Línea actualizada')
            return redirect('lista_lineas')
    else:
        form = LineaForm(instance=linea)
    return render(request, 'lineas/editar_linea.html', {
        'form': form,
        'linea': linea,
        'titulo': f'Editar: {linea.nombre}'
    })


def baja_linea(request, pk):
    print(f"Método recibido: {request.method}")
    print(f"ID recibido: {pk}")
    linea = get_object_or_404(Lineas, idlineas=pk)
    print(f"Línea encontrada: {linea}")

    if request.method == 'POST':
        print("Procesando POST...")
        try:
            linea.delete()
            print("Línea eliminada")
            messages.success(request, 'Línea eliminada')
        except Exception as e:
            print(f"Error: {str(e)}")
            messages.error(request, f'Error: {str(e)}')

    return redirect('lista_lineas')
