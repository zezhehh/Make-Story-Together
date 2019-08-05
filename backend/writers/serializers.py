from rest_framework import serializers
from .models import Writer

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=6, max_length=20)
    password = serializers.CharField(min_length=8, max_length=20)
    screen_name = serializers.CharField(min_length=1, max_length=15)


class SigninSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writer
        fields = ['screen_name', 'username', 'created_at']
