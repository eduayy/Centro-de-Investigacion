from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models import Estudiantes, Proyectos, Area, Especialidades, Lineas, Eventos, Articulos, Unidades, Herramientas, Carreras, Investigadores
from ..serializers import EstudiantesSerializer, ProyectosSerializer, AreaSerializer, EspecialidadesSerializer, LineasSerializer, EventosSerializer, ArticulosSerializer, UnidadesSerializer, HerramientasSerializer, CarrerasSerializer, InvestigadoresSerializer

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
