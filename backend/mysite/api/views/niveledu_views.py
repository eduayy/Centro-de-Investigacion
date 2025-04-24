from rest_framework import generics
from ..models import NivelEdu
from ..serializers import NivelEduSerializer

class NivelEduListCreateAPIView(generics.ListCreateAPIView):
    queryset = NivelEdu.objects.all()
    serializer_class = NivelEduSerializer

class NivelEduRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NivelEdu.objects.all()
    serializer_class = NivelEduSerializer
