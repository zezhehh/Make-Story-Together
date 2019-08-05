from django.contrib.auth import login as django_login
from django.contrib.auth.models import User
from django.dispatch import receiver
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import InfoSerializer, SigninSerializer, RegisterSerializer
from .models import Writer

def create_writer(data):
    user = User.objects.create_user(data['username'], password=data['password'])
    user.save()
    writer = Writer.objects.create(user=user, screen_name=data['screen_name'])
    writer.save()
    return user, writer


# Create your views here.
class WriterViewSet(viewsets.ModelViewSet):
    serializer_class = InfoSerializer

    def get_queryset(self):
        return [self.request.user.account, ]
    
    @action(detail=False, methods=['POST', ])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
        user, writer = create_writer(serializer.data)
        django_login(request, user)
        return Response(self.get_serializer(writer).data, status=status.HTTP_201_CREATED)

    # @action(detail=False, methods=['POST', ])
    # def signin(self, request):
    #     user = self.get_object()
    #     serializer = SigninSerializer(data=request.data)
    #     if serializer.is_valid():
    #         user.set_password(serializer.data['password'])
    #         user.save()
    #         return Response({'status': 'password set'})
    #     else:
    #         return Response(serializer.errors,
    #                         status=status.HTTP_400_BAD_REQUEST)
    