from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, IsAuthenticated
from ..models import Estudiantes
from ..serializers import EstudiantesSerializer


class PermisosEstudiantes(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.idpermiso.rol in [1, 2]


class EstudiantesViewSet(viewsets.ModelViewSet):
    queryset = Estudiantes.objects.filter(estatus=True)
    serializer_class = EstudiantesSerializer
    permission_classes = [IsAuthenticated, PermisosEstudiantes]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.dar_de_baja():
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"detail": "No se pudo realizar la baja"},
            status=status.HTTP_400_BAD_REQUEST
        )
