from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_view,
    login_api,
    inicio,
    logout_view,
)
from .views.api_views import (EstudiantesViewSet, ProyectosViewSet, AreaViewSet, EspecialidadesViewSet,
                              LineasViewSet, EventosViewSet, ArticulosViewSet, UnidadesViewSet, HerramientasViewSet,
                              CarrerasViewSet, InvestigadoresViewSet, NivelEduViewSet, TipoEstudianteViewSet, DetArtViewSet,
                              DetEventosViewSet, DetHerramientaViewSet, DetLineasViewSet, DetProyViewSet, NivelSniViewSet, TipoEventoViewSet,
                              SniViewSet
                              )

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
router.register(r'nivel-edu-api', NivelEduViewSet, basename='niveledu')
router.register(r'tipoestudiantes-api', TipoEstudianteViewSet,
                basename='tipoestudiante')
router.register(r'detart-api', DetArtViewSet, basename='detart')
router.register(r'deteventos-api', DetEventosViewSet, basename='deteventos')
router.register(r'detherramienta-api', DetHerramientaViewSet,
                basename='detherramienta')
router.register(r'detlineas-api', DetLineasViewSet, basename='detlineas')
router.register(r'detproy-api', DetProyViewSet, basename='detproy')
router.register(r'nivelsni-api', NivelSniViewSet, basename='nivelsni')
router.register(r'tipoevento-api', TipoEventoViewSet, basename='tipoevento')
router.register(r'sni-api', SniViewSet, basename='sni')


urlpatterns = [
    # Autenticación
    path('login/', login_view, name='login'),
    path('login-api/', login_api, name='login_api'),
    path('inicio/', inicio, name='inicio'),
    path('logout/', logout_view, name='logout'),

    # API
    path('api/', include(router.urls)),
]
