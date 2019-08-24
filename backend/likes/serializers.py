from rest_framework import serializers
from generic_relations.relations import GenericRelatedField
from stories.models import Story, Character, Plot
from stories.serializers import StorySerializer, CharacterSerializer, PlotSerializer
from writers.models import Writer
from writers.serializers import InfoSerializer
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    liked_object = GenericRelatedField({
        Story: StorySerializer(),
        Character: CharacterSerializer(),
        Plot: PlotSerializer(),
        Writer: InfoSerializer(),
    })
    model_name = serializers.CharField()

    class Meta:
        model = Like
        fields = ['from_user', 'liked_object', 'model_name']
