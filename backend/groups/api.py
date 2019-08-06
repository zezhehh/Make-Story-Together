from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Group
from .serializers import GroupSerializer
from .permissions import GroupPermission
# Create your views here.

class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [GroupPermission, ]

    def get_queryset(self):
        return Group.objects.all()

