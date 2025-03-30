from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Investigadores, NivelEdu, Area
from ..forms import InvestigadorForm


def lista_investigadores(request):
    investigadores = Investigadores.objects.all().order_by('idinvestigadores')
    return render(request, 'investigadores/lista_investigadores.html', {
        'investigadores': investigadores,
        'titulo': 'Listado de Investigadores'
    })


def alta_investigador(request):
    if request.method == 'POST':
        form = InvestigadorForm(request.POST)
        if form.is_valid():
            try:
                ultimo_investigador = Investigadores.objects.order_by(
                    '-idinvestigadores').first()
                nuevo_id = ultimo_investigador.idinvestigadores + 1 if ultimo_investigador else 1

                investigador = form.save(commit=False)
                investigador.idinvestigadores = nuevo_id
                investigador.save()

                messages.success(
                    request, f'Investigador creado con ID {nuevo_id}')
                return redirect('lista_investigadores')
            except Exception as e:
                messages.error(
                    request, f'Error al crear investigador: {str(e)}')
    else:
        form = InvestigadorForm()

    return render(request, 'investigadores/alta_investigador.html', {
        'form': form,
        'titulo': 'Nuevo Investigador'
    })


def editar_investigador(request, pk):
    investigador = get_object_or_404(Investigadores, pk=pk)
    if request.method == 'POST':
        form = InvestigadorForm(request.POST, instance=investigador)
        if form.is_valid():
            form.save()
            messages.success(request, 'Investigador actualizado')
            return redirect('lista_investigadores')
    else:
        form = InvestigadorForm(instance=investigador)

    return render(request, 'investigadores/editar_investigador.html', {
        'form': form,
        'investigador': investigador,
        'titulo': f'Editar: {investigador.nombre}'
    })


def baja_investigador(request, pk):
    investigador = get_object_or_404(Investigadores, idinvestigadores=pk)
    if request.method == 'POST':
        try:
            investigador.delete()
            messages.success(request, 'Investigador eliminado')
        except Exception as e:
            messages.error(request, f'Error: {str(e)}')
    return redirect('lista_investigadores')
