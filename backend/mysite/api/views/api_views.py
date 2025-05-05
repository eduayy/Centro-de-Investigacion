import subprocess
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models import (Estudiantes, Proyectos, Area, Especialidades, Lineas, Eventos,
                      Articulos, Unidades, Herramientas, Carreras, Investigadores, NivelEdu,
                      TipoEstudiante, DetArt, DetEventos, DetHerramienta, DetLineas, DetProy,
                      NivelSni, TipoEvento, Sni)
from ..serializers import (EstudiantesSerializer, ProyectosSerializer, AreaSerializer, EspecialidadesSerializer,
                           LineasSerializer, EventosSerializer, ArticulosSerializer, UnidadesSerializer, HerramientasSerializer,
                           CarrerasSerializer, InvestigadoresSerializer, NivelEduSerializer, TipoEstudianteSerializer, DetArtSerializer,
                           DetEventosSerializer, DetHerramientaSerializer, DetLineasSerializer, DetProySerializer, NivelSniSerializer,
                           TipoEventoSerializer, SniSerializer
                           )
# Estudiantes


class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiantes.objects.all()
    serializer_class = EstudiantesSerializer
    permission_classes = [AllowAny]

# Proyectos


class ProyectosViewSet(viewsets.ModelViewSet):
    queryset = Proyectos.objects.all()
    serializer_class = ProyectosSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Áreas


class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Especialidades


class EspecialidadesViewSet(viewsets.ModelViewSet):
    queryset = Especialidades.objects.all()
    serializer_class = EspecialidadesSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# lineas


class LineasViewSet(viewsets.ModelViewSet):
    queryset = Lineas.objects.all()
    serializer_class = LineasSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Eventos


class EventosViewSet(viewsets.ModelViewSet):
    queryset = Eventos.objects.all()
    serializer_class = EventosSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# articulos

class ArticulosViewSet(viewsets.ModelViewSet):
    queryset = Articulos.objects.all()
    serializer_class = ArticulosSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Unidades


class UnidadesViewSet(viewsets.ModelViewSet):
    queryset = Unidades.objects.all()
    serializer_class = UnidadesSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Herramientas


class HerramientasViewSet(viewsets.ModelViewSet):
    queryset = Herramientas.objects.all()
    serializer_class = HerramientasSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# carreras


class CarrerasViewSet(viewsets.ModelViewSet):
    queryset = Carreras.objects.all()
    serializer_class = CarrerasSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class InvestigadoresViewSet(viewsets.ModelViewSet):
    queryset = Investigadores.objects.all()
    serializer_class = InvestigadoresSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Nivel Educativo


class NivelEduViewSet(viewsets.ModelViewSet):
    queryset = NivelEdu.objects.all()
    serializer_class = NivelEduSerializer

# Tipo estudainte


class TipoEstudianteViewSet(viewsets.ModelViewSet):
    queryset = TipoEstudiante.objects.all()
    serializer_class = TipoEstudianteSerializer

# DetArt


class DetArtViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DetArt.objects.all()
    serializer_class = DetArtSerializer
    permission_classes = [AllowAny]

# DetEventos


class DetEventosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DetEventos.objects.all()
    serializer_class = DetEventosSerializer
    permission_classes = [AllowAny]

# DetHerramienta


class DetHerramientaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DetHerramienta.objects.all()
    serializer_class = DetHerramientaSerializer
    permission_classes = [AllowAny]

# DetLineas


class DetLineasViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DetLineas.objects.all()
    serializer_class = DetLineasSerializer
    permission_classes = [AllowAny]

# DetProy


class DetProyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DetProy.objects.all()
    serializer_class = DetProySerializer
    permission_classes = [AllowAny]

# NivelSNI


class NivelSniViewSet(viewsets.ModelViewSet):
    queryset = NivelSni.objects.all()
    serializer_class = NivelSniSerializer

# TipoEvento


class TipoEventoViewSet(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer

# SNI


class SniViewSet(viewsets.ModelViewSet):
    queryset = Sni.objects.all()
    serializer_class = SniSerializer

# BD Restorer


@csrf_exempt
def restaurar_bd(request):
    if request.method == "POST":
        try:
            #
            db_name = "investigadores_db_restored"
            db_user = "postgres"  # Tu usuario
            db_password = "12345"  # Tu contraseña

            ruta_sql = os.path.join(
                settings.BASE_DIR,
                "api",
                "DataBase",
                "investigadores_database.sql"
            )

            if not os.path.exists(ruta_sql):
                return JsonResponse(
                    {"error": f"Archivo SQL no encontrado: {ruta_sql}"},
                    status=500
                )

            comandos = [
                f"psql -U {db_user} -d postgres -c \"DROP DATABASE IF EXISTS {db_name};\"",
                f"psql -U {db_user} -d postgres -c \"CREATE DATABASE {db_name};\"",
                f"psql -U {db_user} -d {db_name} -f \"{ruta_sql}\""
            ]

            for comando in comandos:
                resultado = subprocess.run(
                    comando,
                    shell=True,
                    check=True,
                    capture_output=True,
                    text=True,
                    env={**os.environ, "PGPASSWORD": db_password}
                )

                print(f"Ejecutado: {comando}")
                print(f"Salida: {resultado.stdout}")
                if resultado.stderr:
                    print(f"Error: {resultado.stderr}")

            return JsonResponse({
                "message": f"Base de datos '{db_name}' restaurada exitosamente desde: {ruta_sql}"
            })

        except subprocess.CalledProcessError as e:
            error_detail = f"ERROR PostgreSQL: {e.stderr}" if e.stderr else str(
                e)
            return JsonResponse({
                "error": f"Fallo en comando: {e.cmd}",
                "detalle": error_detail
            }, status=500)

        except Exception as e:
            return JsonResponse({
                "error": "Error inesperado",
                "detalle": str(e)
            }, status=500)

    return JsonResponse({"error": "Método no permitido. Usa POST."}, status=405)
