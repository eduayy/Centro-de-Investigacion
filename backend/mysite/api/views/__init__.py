from .auth_views import (
    login_view,
    login_api,
    inicio,
    logout_view,
    permiso_requerido
)
from .estudiante_views import (
    lista_estudiantes,
    alta_estudiante,
    editar_estudiante,
    baja_estudiante
)
from .api_views import EstudiantesViewSet
