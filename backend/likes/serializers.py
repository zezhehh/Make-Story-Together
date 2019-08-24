from django.apps import apps
from django.contrib.contenttypes.models import ContentType
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
    app_label = serializers.CharField()
    from_user = serializers.CharField(source='from_user.screen_name')

    class Meta:
        model = Like
        fields = ['id', 'from_user', 'liked_object', 'model_name', 'app_label']


class MiniSerializerBase(serializers.Serializer):
    def to_internal_value(self, value):
        return value

class MiniStorySerializer(serializers.ModelSerializer, MiniSerializerBase):
    class Meta:
        model = Story
        fields = ['id', ]

class MiniCharacterSerializer(serializers.ModelSerializer, MiniSerializerBase):
    
    class Meta:
        model = Character
        fields = ['id', ]

class MiniPlotSerializer(serializers.ModelSerializer, MiniSerializerBase):
    class Meta:
        model = Plot
        fields = ['id', ]

class MiniInfoSerializer(serializers.ModelSerializer, MiniSerializerBase):
    class Meta:
        model = Writer
        fileds = ['id', ]

class MiniBaseGenericRelatedField(GenericRelatedField):
    def get_deserializer_for_data(self, value):
        model_name = value['model_name']
        Model = apps.get_model(app_label=value['app_label'], model_name=model_name)
        liked_obejct = Model.objects.get(id=value['id'])
        if model_name == 'story':
            return MiniStorySerializer(liked_obejct)
        elif model_name == 'plot':
            return MiniPlotSerializer(liked_obejct)
        elif model_name == 'writer':
            return MiniInfoSerializer(liked_obejct)
        elif model_name == 'character':
            return MiniCharacterSerializer(liked_obejct)
        return []

class LikeCreationSerializer(serializers.ModelSerializer):
    liked_object = MiniBaseGenericRelatedField({
        Story: MiniStorySerializer(),
        Character: MiniCharacterSerializer(),
        Plot: MiniPlotSerializer(),
        Writer: MiniInfoSerializer(),
    })

    class Meta:
        model = Like
        fields = ['liked_object', ]

    def validate_liked_object(self, liked_object_info):
        from_user =  self.context['request'].user.account
        Model = apps.get_model(app_label=liked_object_info['app_label'], model_name=liked_object_info['model_name'])
        content_type = ContentType.objects.get_for_model(Model)
        if Like.objects.filter(content_type=content_type, object_id=liked_object_info['id'], from_user=from_user).exists():
            raise serializers.ValidationError(f"Like exists.")
        return liked_object_info

    def create(self, validated_data):
        from_user =  self.context['request'].user.account
        liked_object_info = validated_data['liked_object']
        Model = apps.get_model(app_label=liked_object_info['app_label'], model_name=liked_object_info['model_name'])
        liked_object = Model.objects.get(id=liked_object_info['id'])
        like = Like.objects.create(liked_object=liked_object, from_user=from_user)
        return like

