from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_view,
    login_api,
    inicio,
    logout_view,
    lista_estudiantes,
    alta_estudiante,
    editar_estudiante,
    baja_estudiante,
    lista_proyectos,
    alta_proyecto,
    editar_proyecto,
    baja_proyecto,
    lista_areas,
    alta_area,
    editar_area,
    baja_area,
    lista_especialidades,
    alta_especialidad,
    editar_especialidad,
    baja_especialidad,
    lista_lineas,
    alta_linea,
    editar_linea,
    baja_linea,
    lista_eventos,
    alta_evento,
    editar_evento,
    baja_evento,
    lista_articulos,
    alta_articulo,
    editar_articulo,
    baja_articulo,
    lista_unidades,
    alta_unidad,
    editar_unidad,
    baja_unidad,
    lista_herramientas,
    alta_herramienta,
    editar_herramienta,
    baja_herramienta,
    lista_carreras,
    alta_carrera,
    editar_carrera,
    baja_carrera,
    lista_investigadores,
    alta_investigador,
    editar_investigador,
    baja_investigador
)
from .views.api_views import EstudiantesViewSet, ProyectosViewSet, AreaViewSet, EspecialidadesViewSet, LineasViewSet, EventosViewSet, ArticulosViewSet, UnidadesViewSet, HerramientasViewSet, CarrerasViewSet, InvestigadoresViewSet

router = DefaultRouter()
router.register(r'estudiantes-api', EstudiantesViewSet, basename='estudiantes')
router.register(r'proyectos-api', ProyectosViewSet, basename='proyectos')
router.register(r'areas-api', AreaViewSet, basename='areas')
router.register(r'especialidades-api', EspecialidadesViewSet,
                basename='especialidades')
router.register(r'lineas-api', LineasViewSet, basename='lineas')
router.register(r'eventos-api', EventosViewSet, basename='eventos')
router.register(r'articulos-api', ArticulosViewSet, basename='articulos')
router.register(r'unidades-api', UnidadesViewSet, basename='unidades')
router.register(r'herramientas-api', HerramientasViewSet,
                basename='herramientas')
router.register(r'carreras-api', CarrerasViewSet, basename='carreras')
router.register(r'investigadores-api', InvestigadoresViewSet,
                basename='investigadores')


urlpatterns = [
    # Autenticación
    path('login/', login_view, name='login'),
    path('login-api/', login_api, name='login_api'),
    path('inicio/', inicio, name='inicio'),
    path('logout/', logout_view, name='logout'),

    # Estudiantes
    path('estudiantes/', lista_estudiantes, name='lista_estudiantes'),
    path('estudiantes/alta/', alta_estudiante, name='alta_estudiante'),
    path('estudiantes/editar/<int:pk>/',
         editar_estudiante, name='editar_estudiante'),
    path('estudiantes/baja/<int:pk>/', baja_estudiante, name='baja_estudiante'),

    # Proyectos
    path('proyectos/', lista_proyectos, name='lista_proyectos'),
    path('proyectos/alta/', alta_proyecto, name='alta_proyecto'),
    path('proyectos/editar/<int:pk>/', editar_proyecto, name='editar_proyecto'),
    path('proyectos/baja/<int:pk>/', baja_proyecto, name='baja_proyecto'),

    # Áreas
    path('areas/', lista_areas, name='lista_areas'),
    path('areas/alta/', alta_area, name='alta_area'),
    path('areas/editar/<int:pk>/', editar_area, name='editar_area'),
    path('areas/baja/<int:pk>/', baja_area, name='baja_area'),

    # Especialidades
    path('especialidades/', lista_especialidades, name='lista_especialidades'),
    path('especialidades/alta/', alta_especialidad, name='alta_especialidad'),
    path('especialidades/editar/<int:pk>/',
         editar_especialidad, name='editar_especialidad'),
    path('especialidades/baja/<int:pk>/',
         baja_especialidad, name='baja_especialidad'),

    # Líneas de Investigación
    path('lineas/', lista_lineas, name='lista_lineas'),
    path('lineas/alta/', alta_linea, name='alta_linea'),
    path('lineas/editar/<int:pk>/', editar_linea, name='editar_linea'),
    path('lineas/baja/<int:pk>/', baja_linea, name='baja_linea'),

    # Eventos
    path('eventos/', lista_eventos, name='lista_eventos'),
    path('eventos/alta/', alta_evento, name='alta_evento'),
    path('eventos/editar/<int:pk>/', editar_evento, name='editar_evento'),
    path('eventos/baja/<int:pk>/', baja_evento, name='baja_evento'),

    # Artículos
    path('articulos/', lista_articulos, name='lista_articulos'),
    path('articulos/alta/', alta_articulo, name='alta_articulo'),
    path('articulos/editar/<int:pk>/', editar_articulo, name='editar_articulo'),
    path('articulos/baja/<int:pk>/', baja_articulo, name='baja_articulo'),

    # Unidades
    path('unidades/', lista_unidades, name='lista_unidades'),
    path('unidades/alta/', alta_unidad, name='alta_unidad'),
    path('unidades/editar/<int:pk>/', editar_unidad, name='editar_unidad'),
    path('unidades/baja/<int:pk>/', baja_unidad, name='baja_unidad'),

    # Herramientas
    path('herramientas/', lista_herramientas, name='lista_herramientas'),
    path('herramientas/alta/', alta_herramienta, name='alta_herramienta'),
    path('herramientas/editar/<int:pk>/',
         editar_herramienta, name='editar_herramienta'),
    path('herramientas/baja/<int:pk>/',
         baja_herramienta, name='baja_herramienta'),

    # Carreras
    path('carreras/', lista_carreras, name='lista_carreras'),
    path('carreras/alta/', alta_carrera, name='alta_carrera'),
    path('carreras/editar/<int:pk>/', editar_carrera, name='editar_carrera'),
    path('carreras/baja/<int:pk>/', baja_carrera, name='baja_carrera'),

    # Investigadores
    path('investigadores/', lista_investigadores, name='lista_investigadores'),
    path('investigadores/alta/', alta_investigador, name='alta_investigador'),
    path('investigadores/editar/<int:pk>/',
         editar_investigador, name='editar_investigador'),
    path('investigadores/baja/<int:pk>/',
         baja_investigador, name='baja_investigador'),

    # API
    path('api/', include(router.urls)),
]
