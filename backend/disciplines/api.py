from rest_framework import status, viewsets
from rest_framework.response import Response
from .constants import PUBLIC
from .models import Discipline
from .serializers import DisciplineSerializer
from .permissions import DisciplinePermission

# Create your views here.
class DisciplineViewSet(viewsets.ModelViewSet):
    serializer_class = DisciplineSerializer
    permission_classes = [DisciplinePermission, ]

    def get_queryset(self):
        public_discipline = Discipline.objects.filter(ptype=PUBLIC)
        stories_discipline = Discipline.objects.none()
        for story in self.request.user.account.stories.all():
            stories_discipline |= story.rule.all()
        
        groups_discipline = Discipline.objects.none()
        for group in self.request.user.account.groups.all():
            groups_discipline |= group.rule.all()
        return public_discipline | stories_discipline | groups_discipline
    
    def destroy(self, request, pk=None):
        discipline = self.get_object()
        if discipline.ptype == PUBLIC:
            return Response(status=status.HTTP_403_FORBIDDEN)
        discipline.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
