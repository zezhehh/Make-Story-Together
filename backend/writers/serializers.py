from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Writer

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=6, max_length=20)
    password = serializers.CharField(min_length=8, max_length=20)
    screen_name = serializers.CharField(min_length=1, max_length=15)

    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            return value
        raise serializers.ValidationError("Username exsited.")

    def validate_screen_name(self, value):
        if not Writer.objects.filter(screen_name=value).exists():
            return value
        raise serializers.ValidationError("Screen-name exsited.")


class SigninSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writer
        fields = ['screen_name', 'username', 'created_at']
