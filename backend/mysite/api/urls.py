from django.urls import path, include  # Añade include aquí
from .views import (
    login_view,
    login_api,
    inicio,
    logout_view,
    lista_estudiantes,
    alta_estudiante,
    editar_estudiante,
    baja_estudiante
)
from .views.api_views import EstudiantesViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'estudiantes-api', EstudiantesViewSet, basename='estudiantes')

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

    # API
    path('api/', include(router.urls)),  # Ahora include está definido
]
