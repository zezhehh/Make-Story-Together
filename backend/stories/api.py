from rest_framework import viewsets, status
from .permissions import StoryPermission
from .serializers import StorySerializer, TagSerializer
from .models import Story, Tag
from .constants import PUBLIC
# Create your views here.

class StoryViewSet(viewsets.ModelViewSet):
    serializer_class = StorySerializer
    permission_classes = [StoryPermission, ]

    def get_queryset(self):
        qs = Story.objects.filter(public=PUBLIC)
        if not self.request.user.is_anonymous:
            qs |= Story.objects.filter(participators__screen_name__icontains=self.request.user.account.screen_name)
        return qs


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()

