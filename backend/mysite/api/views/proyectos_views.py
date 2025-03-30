from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Proyectos
from ..forms import ProyectoForm


def lista_proyectos(request):
    proyectos = Proyectos.objects.all().order_by('idproyecto')
    return render(request, 'proyectos/lista_proyectos.html', {
        'proyectos': proyectos,
        'titulo': 'Listado de Proyectos Públicos'
    })


def alta_proyecto(request):
    if request.method == 'POST':
        form = ProyectoForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente de manera segura
                ultimo_proyecto = Proyectos.objects.order_by(
                    '-idproyecto').first()

                if ultimo_proyecto and ultimo_proyecto.idproyecto is not None:
                    nuevo_id = ultimo_proyecto.idproyecto + 1
                else:
                    nuevo_id = 1  # Primer proyecto si no hay registros

                # Crear y guardar el proyecto con el nuevo ID
                proyecto = form.save(commit=False)
                proyecto.idproyecto = nuevo_id
                proyecto.save()

                messages.success(request, f'Proyecto creado con ID {nuevo_id}')
                return redirect('lista_proyectos')

            except Exception as e:
                messages.error(request, f'Error al crear proyecto: {str(e)}')
    else:
        form = ProyectoForm()

    return render(request, 'proyectos/alta_proyecto.html', {
        'form': form,
        'titulo': 'Nuevo Proyecto'
    })


def editar_proyecto(request, pk):
    proyecto = get_object_or_404(Proyectos, pk=pk)
    if request.method == 'POST':
        form = ProyectoForm(request.POST, instance=proyecto)
        if form.is_valid():
            form.save()
            messages.success(request, 'Proyecto actualizado')
            return redirect('lista_proyectos')
    else:
        form = ProyectoForm(instance=proyecto)
    return render(request, 'proyectos/editar_proyecto.html', {
        'form': form,
        'proyecto': proyecto,
        'titulo': f'Editar: {proyecto.nombreproyecto}'
    })


def baja_proyecto(request, pk):
    print(f"Método recibido: {request.method}")  # Debug
    print(f"ID recibido: {pk}")  # Debug
    proyecto = get_object_or_404(Proyectos, idproyecto=pk)
    print(f"Proyecto encontrado: {proyecto}")  # Debug

    if request.method == 'POST':
        print("Procesando POST...")  # Debug
        try:
            proyecto.delete()
            print("Proyecto eliminado")  # Debug
            messages.success(request, 'Proyecto eliminado')
        except Exception as e:
            print(f"Error: {str(e)}")  # Debug
            messages.error(request, f'Error: {str(e)}')

    return redirect('lista_proyectos')
