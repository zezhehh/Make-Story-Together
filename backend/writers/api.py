from django.contrib.auth import login as django_login, authenticate, logout as django_logout
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
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
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return [self.request.user.account, ]
    
    @action(detail=False, methods=['POST', ], serializer_class=RegisterSerializer, permission_classes=[AllowAny, ])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user, writer = create_writer(serializer.data)
        # django_login(request, user)
        return Response(InfoSerializer(writer).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['POST', ], serializer_class=SigninSerializer, permission_classes=[AllowAny, ])
    def signin(self, request):
        serializer = SigninSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'error': 'Username and/or password are not invalid.'}, 
                status=status.HTTP_400_BAD_REQUEST)
        data = serializer.data
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            return Response({'error': 'Username and/or password are not correct.'}, 
                status=status.HTTP_400_BAD_REQUEST)
        # django_login(request, user)
        return Response(InfoSerializer(user.account).data, status=status.HTTP_200_OK)
    
    # @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated, ])
    # def logout(self, request):
    #     django_logout(request)
    #     # return Response({'next': '/'}, status=status.HTTP_302_FOUND)
    #     return Response(status=status.HTTP_200_OK)
