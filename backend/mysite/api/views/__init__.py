from .auth_views import (
    login_view,
    login_api,
    inicio,
    logout_view
)
from .estudiante_views import (
    lista_estudiantes,
    alta_estudiante,
    editar_estudiante,
    baja_estudiante
)
from .api_views import (
    EstudiantesViewSet
)

from .api_views import ProyectosViewSet
from .proyectos_views import (
    lista_proyectos,
    alta_proyecto,
    editar_proyecto,
    baja_proyecto
)

from .api_views import AreaViewSet
from .areas_views import (
    lista_areas,
    alta_area,
    editar_area,
    baja_area
)

from .api_views import EspecialidadesViewSet
from .especialidad_views import (
    lista_especialidades,
    alta_especialidad,
    editar_especialidad,
    baja_especialidad
)

from .lineas_views import (
    lista_lineas,
    alta_linea,
    editar_linea,
    baja_linea
)

from .eventos_views import (
    lista_eventos,
    alta_evento,
    editar_evento,
    baja_evento
)

from .articulos_views import (
    lista_articulos,
    alta_articulo,
    editar_articulo,
    baja_articulo
)

from .unidades_views import (
    lista_unidades,
    alta_unidad,
    editar_unidad,
    baja_unidad
)

from .herramientas_views import (
    lista_herramientas,
    alta_herramienta,
    editar_herramienta,
    baja_herramienta
)

from .carreras_views import (
    lista_carreras,
    alta_carrera,
    editar_carrera,
    baja_carrera
)

from .investigadores_views import (
    lista_investigadores,
    alta_investigador,
    editar_investigador,
    baja_investigador
)
