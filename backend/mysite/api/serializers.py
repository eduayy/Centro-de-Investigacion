from .models import TipoEstudiante
from rest_framework import serializers
from api.models import Estudiantes, Proyectos, Area, Especialidades, Lineas, Eventos, Articulos, Unidades, Herramientas, Carreras, Investigadores, NivelEdu, TipoEstudiante


# Estudiantes


class EstudiantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = '__all__'

# Proyectos


class ProyectosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyectos
        fields = '__all__'


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'


class EspecialidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidades
        fields = '__all__'


class LineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineas
        fields = '__all__'


class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = '__all__'


class ArticulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulos
        fields = '__all__'


class UnidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidades
        fields = '__all__'


class HerramientasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Herramientas
        fields = '__all__'


class CarrerasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carreras
        fields = '__all__'


class InvestigadoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investigadores
        fields = '__all__'


class NivelEduSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelEdu
        fields = '__all__'


class TipoEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstudiante
        fields = '__all__'
