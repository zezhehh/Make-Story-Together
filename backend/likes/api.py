from rest_framework.viewsets import ModelViewSet
from .serializers import LikeSerializer
from .models import Like


class LikeViewSet(ModelViewSet):
    serializer_class = LikeSerializer

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return []
        return Like.objects.filter(from_user=self.request.user.account)

