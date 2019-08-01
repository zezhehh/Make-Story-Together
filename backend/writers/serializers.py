from rest_framework import serializers

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=6, max_length=20, unique=True)
    password = serializers.CharField(min_length=8, max_length=20)
    screen_name = serializers.CharField(unique=True, min_length=1, max_length=15)


class SigninSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
