from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import FeedSerializer
from .models import Feed


class FeedViewSet(viewsets.ModelViewSet):
    serializer_class = FeedSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication]

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return []
        return Feed.objects.all()

    # def get_serializer_class(self):
    #     if self.request.method == 'POST':
    #         return LikeCreationSerializer
        
    #     return LikeSerializer
