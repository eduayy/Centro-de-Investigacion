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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.dar_de_baja():
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"detail": "No se pudo realizar la baja"},
            status=status.HTTP_400_BAD_REQUEST
        )

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
