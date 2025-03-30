from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Eventos
from ..forms import EventoForm


def lista_eventos(request):
    eventos = Eventos.objects.all().order_by('idevento')
    return render(request, 'eventos/lista_eventos.html', {
        'eventos': eventos,
        'titulo': 'Listado de Eventos'
    })


def alta_evento(request):
    if request.method == 'POST':
        form = EventoForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultimo_evento = Eventos.objects.order_by('-idevento').first()
                nuevo_id = ultimo_evento.idevento + 1 if ultimo_evento else 1

                # Guardar con el nuevo ID
                evento = form.save(commit=False)
                evento.idevento = nuevo_id
                evento.save()

                messages.success(request, f'Evento creado con ID {nuevo_id}')
                return redirect('lista_eventos')
            except Exception as e:
                messages.error(request, f'Error al crear evento: {str(e)}')
    else:
        form = EventoForm()

    return render(request, 'eventos/alta_evento.html', {
        'form': form,
        'titulo': 'Nuevo Evento'
    })


def editar_evento(request, pk):
    evento = get_object_or_404(Eventos, idevento=pk)
    if request.method == 'POST':
        form = EventoForm(request.POST, instance=evento)
        if form.is_valid():
            form.save()
            messages.success(request, 'Evento actualizado')
            return redirect('lista_eventos')
    else:
        form = EventoForm(instance=evento)
    return render(request, 'eventos/editar_evento.html', {
        'form': form,
        'evento': evento,
        'titulo': f'Editar: {evento.nombreevento}'
    })


def baja_evento(request, pk):
    print(f"Método recibido: {request.method}")
    print(f"ID recibido: {pk}")
    evento = get_object_or_404(Eventos, idevento=pk)
    print(f"Evento encontrado: {evento}")

    if request.method == 'POST':
        print("Procesando POST...")
        try:
            evento.delete()
            print("Evento eliminado")
            messages.success(request, 'Evento eliminado')
        except Exception as e:
            print(f"Error: {str(e)}")
            messages.error(request, f'Error: {str(e)}')

    return redirect('lista_eventos')
