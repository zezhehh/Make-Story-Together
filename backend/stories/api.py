from rest_framework import viewsets, status
from .permissions import StoryPermission
from .serializers import StorySerializer
from .models import Story
from .constants import PUBLIC
# Create your views here.

class StoryViewSet(viewsets.ModelViewSet):
    serializer_class = StorySerializer
    permission_classes = [StoryPermission, ]

    def get_queryset(self):
        return Story.objects.filter(public=PUBLIC) | \
            Story.objects.filter(participators__in=self.request.user.account)

