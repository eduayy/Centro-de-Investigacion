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
                              SniViewSet, restaurar_bd, register_user
                              )
router = DefaultRouter()
# Area endpoints
router.register(r'areas-api', AreaViewSet, basename='areas')

# Articles endpoints
router.register(r'articulos-api', ArticulosViewSet, basename='articulos')
router.register(r'detart-api', DetArtViewSet, basename='detart')

# Carreras endpoints
router.register(r'carreras-api', CarrerasViewSet, basename='carreras')

# Events endpoints
router.register(r'deteventos-api', DetEventosViewSet, basename='deteventos')
router.register(r'eventos-api', EventosViewSet, basename='eventos')
router.register(r'tipoevento-api', TipoEventoViewSet, basename='tipoevento')

# Information endpoints
router.register(r'nivel-edu-api', NivelEduViewSet, basename='niveledu')

# Investigadores endpoints
router.register(r'investigadores-api', InvestigadoresViewSet, basename='investigadores')

# Lines endpoints
router.register(r'lineas-api', LineasViewSet, basename='lineas')
router.register(r'detlineas-api', DetLineasViewSet, basename='detlineas')

# Proyects endpoints
router.register(r'detproy-api', DetProyViewSet, basename='detproy')
router.register(r'proyectos-api', ProyectosViewSet, basename='proyectos')

# Specialties endpoints
router.register(r'especialidades-api', EspecialidadesViewSet, basename='especialidades')

# Sni endpoints
router.register(r'nivelsni-api', NivelSniViewSet, basename='nivelsni')
router.register(r'sni-api', SniViewSet, basename='sni')

# Students endpoints
router.register(r'estudiantes-api', EstudiantesViewSet, basename='estudiantes')
router.register(r'tipoestudiantes-api', TipoEstudianteViewSet, basename='tipoestudiante')

# Tools endpoints
router.register(r'detherramienta-api', DetHerramientaViewSet, basename='detherramienta')
router.register(r'herramientas-api', HerramientasViewSet, basename='herramientas')

# Units endpoints
router.register(r'unidades-api', UnidadesViewSet, basename='unidades')


urlpatterns = [
    # Autenticación
    path('login/', login_view, name='login'),
    path('login-api/', login_api, name='login_api'),
    path('inicio/', inicio, name='inicio'),
    path('logout/', logout_view, name='logout'),
    path('api/restaurar-bd/', restaurar_bd, name='restaurar_bd'),
    path('api/register/', register_user, name='register_user'),



    # API
    path('api/', include(router.urls)),
]
