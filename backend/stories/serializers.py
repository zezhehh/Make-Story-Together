from rest_framework import serializers
from stories.models import Story


class StorySerializer(serializers.ModelSerializer):
    maintainer = serializers.StringRelatedField()
    creator = serializers.StringRelatedField()

    class Meta:
        model = Story
        fields = ['id', 'creator', 'maintainer', 'category', 'public']
