from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from ..models import Articulos
from ..forms import ArticuloForm


def lista_articulos(request):
    articulos = Articulos.objects.all().order_by('idarticulo')
    return render(request, 'articulos/lista_articulos.html', {
        'articulos': articulos,
        'titulo': 'Listado de Artículos'
    })


def alta_articulo(request):
    if request.method == 'POST':
        form = ArticuloForm(request.POST)
        if form.is_valid():
            try:
                # Obtener el máximo ID existente
                ultimo_articulo = Articulos.objects.order_by(
                    '-idarticulo').first()
                nuevo_id = ultimo_articulo.idarticulo + 1 if ultimo_articulo else 1

                # Crear y guardar el artículo con el nuevo ID
                articulo = form.save(commit=False)
                articulo.idarticulo = nuevo_id
                articulo.save()

                messages.success(request, f'Artículo creado con ID {nuevo_id}')
                return redirect('lista_articulos')

            except Exception as e:
                messages.error(request, f'Error al crear artículo: {str(e)}')
    else:
        form = ArticuloForm()

    return render(request, 'articulos/alta_articulo.html', {
        'form': form,
        'titulo': 'Nuevo Artículo'
    })


def editar_articulo(request, pk):
    articulo = get_object_or_404(Articulos, pk=pk)
    if request.method == 'POST':
        form = ArticuloForm(request.POST, instance=articulo)
        if form.is_valid():
            form.save()
            messages.success(request, 'Artículo actualizado')
            return redirect('lista_articulos')
    else:
        form = ArticuloForm(instance=articulo)
    return render(request, 'articulos/editar_articulo.html', {
        'form': form,
        'articulo': articulo,
        'titulo': f'Editar: {articulo.nombre}'
    })


def baja_articulo(request, pk):
    articulo = get_object_or_404(Articulos, idarticulo=pk)
    if request.method == 'POST':
        try:
            articulo.delete()
            messages.success(request, 'Artículo eliminado')
        except Exception as e:
            messages.error(request, f'Error: {str(e)}')
    return redirect('lista_articulos')
