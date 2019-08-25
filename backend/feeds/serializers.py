from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers
from generic_relations.relations import GenericRelatedField
from stories.models import Story, Character, Plot
from groups.models import Group
from stories.serializers import StorySerializer, CharacterSerializer, PlotSerializer
from groups.serializers import GroupSerializer
from writers.models import Writer
from writers.serializers import InfoSerializer
from .models import Feed


class FeedSerializer(serializers.ModelSerializer):
    content_object = GenericRelatedField({
        Story: StorySerializer(),
        Character: CharacterSerializer(),
        Plot: PlotSerializer(),
        Group: GroupSerializer(),
    })

    class Meta:
        model = Feed
        fields = ['id', 'content_object', 'created_at', 'feed_content']
