from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from .permissions import StoryPermission
from .serializers import StorySerializer, TagSerializer
from groups.models import Group
from .models import Story, Tag
from .constants import PUBLIC
# Create your views here.

class StoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication]
    serializer_class = StorySerializer
    permission_classes = [StoryPermission, ]

    def get_queryset(self):
        params = self.request.query_params
        qs = Story.objects.annotate(member_count=Count('participators')).filter(public=PUBLIC)

        if not self.request.user.is_anonymous:
            qs |= Story.objects.filter(participators__screen_name__icontains=self.request.user.account.screen_name)
        if 'order' in params:
            if params['order'] == 'number':
                qs = qs.order_by('-member_count')
        if 'group' in params and params['group'] != '':
            group = Group.objects.get(id=int(params['group']))
            qs = qs.filter(maintainer=group)
        return qs.order_by('-created_at')

    @action(detail=False, permission_classes=[IsAuthenticated, ])
    def my(self, request):
        stories = Story.objects.filter(creator__screen_name=request.user.account.screen_name)
        serializer = self.get_serializer(stories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, permission_classes=[IsAuthenticated, ])
    def joined(self, request):
        stories = Story.objects.filter(participators__screen_name__icontains=request.user.account.screen_name)
        serializer = self.get_serializer(stories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(detail=True, permission_classes=[IsAuthenticated, ], methods=['POST', ])
    # def join(self, request, pk=None):
    #     story = self.get_object()
    #     GroupMember.objects.create(member=self.request.user.account, group=group)
    #     return Response(status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()

