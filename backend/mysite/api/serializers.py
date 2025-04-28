from .models import TipoEstudiante
from rest_framework import serializers
from api.models import (Estudiantes, Proyectos, Area, Especialidades,
                        Lineas, Eventos, Articulos, Unidades, Herramientas,
                        Carreras, Investigadores, NivelEdu, TipoEstudiante,
                        DetArt, DetEventos, DetHerramienta, DetLineas, DetProy,
                        NivelSni, TipoEvento, Sni
                        )

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


class DetArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetArt
        fields = '__all__'


class DetEventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetEventos
        fields = '__all__'


class DetHerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetHerramienta
        fields = '__all__'


class DetLineasSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetLineas
        fields = '__all__'


class DetProySerializer(serializers.ModelSerializer):
    class Meta:
        model = DetProy
        fields = '__all__'


class NivelSniSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelSni
        fields = '__all__'


class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__'


class SniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sni
        fields = '__all__'
