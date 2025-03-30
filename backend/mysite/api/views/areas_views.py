from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.db import transaction
from ..models import Area
from ..forms import AreaForm


def lista_areas(request):
    areas = Area.objects.all().order_by('idarea')
    return render(request, 'areas/lista_areas.html', {
        'areas': areas,
        'titulo': 'Listado de Áreas'
    })


def alta_area(request):
    if request.method == 'POST':
        form = AreaForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente de manera segura
                ultima_area = Area.objects.order_by('-idarea').first()

                if ultima_area and ultima_area.idarea is not None:
                    nuevo_id = ultima_area.idarea + 1
                else:
                    nuevo_id = 1  # Primer área si no hay registros

                # Crear y guardar el área con el nuevo ID
                area = form.save(commit=False)
                area.idarea = nuevo_id
                area.save()

                messages.success(request, f'Área creada con ID {nuevo_id}')
                return redirect('lista_areas')

            except Exception as e:
                messages.error(request, f'Error al crear área: {str(e)}')
    else:
        form = AreaForm()

    return render(request, 'areas/alta_area.html', {
        'form': form,
        'titulo': 'Nueva Área'
    })


def editar_area(request, pk):
    area = get_object_or_404(Area, pk=pk)
    if request.method == 'POST':
        form = AreaForm(request.POST, instance=area)
        if form.is_valid():
            form.save()
            messages.success(request, 'Área actualizada')
            return redirect('lista_areas')
    else:
        form = AreaForm(instance=area)
    return render(request, 'areas/editar_area.html', {
        'form': form,
        'area': area,
        'titulo': f'Editar: {area.nombrearea}'
    })


def baja_area(request, pk):
    print(f"\n[DEBUG] Solicitud: {request.method} | ID Área: {pk}")

    if request.method == 'POST':
        try:
            # Obtener el área (sin relaciones)
            area = get_object_or_404(Area, idarea=pk)
            print(f"[DEBUG] Área a eliminar: {area.nombrearea}")

            # Eliminación directa con SQL (opción más segura para managed=False)
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM area WHERE idarea = %s", [pk])
                print(f"[DEBUG] Filas afectadas: {cursor.rowcount}")

            messages.success(request, 'Área eliminada correctamente')
        except Exception as e:
            print(f"[ERROR] {str(e)}")
            messages.error(request, 'Error al eliminar el área')

    return redirect('lista_areas')
