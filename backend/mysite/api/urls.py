from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

# URLs para vistas tradicionales
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('api/login/', views.login_api, name='login_api'),
    path('inicio/', views.inicio, name='inicio'),
    path('logout/', views.logout_view, name='logout'),
    path('vista-protegida/', views.vista_protegida, name='vista_protegida'),

    # Gestión de estudiantes
    path('estudiantes/', views.lista_estudiantes, name='lista_estudiantes'),
    path('estudiantes/alta/', views.alta_estudiante, name='alta_estudiante'),
    path('estudiantes/editar/<int:pk>/',
         views.editar_estudiante, name='editar_estudiante'),
    path('estudiantes/baja/<int:pk>/',
         views.baja_estudiante, name='baja_estudiante'),
]

# URLs para DRF (si las necesitas separadas)
router = DefaultRouter()
router.register(r'estudiantes', views.EstudiantesViewSet,
                basename='api_estudiantes')
urlpatterns += router.urls
