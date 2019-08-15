from django.db.models import Count
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from .models import Group, GroupMember
from .serializers import GroupSerializer
from .permissions import GroupPermission
# Create your views here.

class GroupViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication, BasicAuthentication, JSONWebTokenAuthentication]
    serializer_class = GroupSerializer
    permission_classes = [GroupPermission, ]

    def get_queryset(self):
        params = self.request.query_params
        if 'order' in params:
            if params['order'] == 'number':
                return Group.objects.annotate(member_count=Count('members')).order_by('-member_count').order_by('-created_at')
        return Group.objects.all().order_by('-created_at')

    @action(detail=False, permission_classes=[IsAuthenticated, ])
    def my(self, request):
        groups = Group.objects.filter(owner__screen_name=request.user.account.screen_name)
        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, permission_classes=[IsAuthenticated, ])
    def joined(self, request):
        groups = Group.objects.filter(members__screen_name__icontains=request.user.account.screen_name)
        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, permission_classes=[IsAuthenticated, ], methods=['POST', ])
    def join(self, request, pk=None):
        group = self.get_object()
        if not group.members.filter(id=self.request.user.account.id).exists():
            GroupMember.objects.create(member=self.request.user.account, group=group)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, permission_classes=[IsAuthenticated, ], methods=['POST', ])
    def quit(self, request, pk=None):
        group = self.get_object()
        if GroupMember.objects.filter(member=self.request.user.account, group=group).exists():
            instance = GroupMember.objects.get(member=self.request.user.account, group=group)
            instance.delete()
        return Response(status=status.HTTP_200_OK)
