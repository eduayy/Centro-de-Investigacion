from rest_framework import serializers
from api.models import Estudiantes


class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = '__all__'
