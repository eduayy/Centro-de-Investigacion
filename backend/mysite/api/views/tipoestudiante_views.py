from rest_framework import generics
from api.models import TipoEstudiante
from api.serializers import TipoEstudianteSerializer


class TipoEstudianteList(generics.ListAPIView):
    queryset = TipoEstudiante.objects.all()
    serializer_class = TipoEstudianteSerializer
