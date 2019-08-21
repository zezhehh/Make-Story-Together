from rest_framework import serializers
from .models import Story, Tag, Plot, Chapter, Character
from disciplines.serializers import DisciplineSerializer
from writers.serializers import InfoSerializer
from writers.models import Writer
from groups.models import Group

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
    

class StorySerializer(serializers.ModelSerializer):
    maintainer = serializers.CharField(source='maintainer.name', required=False)
    creator = serializers.CharField(source='creator.screen_name')

    class Meta:
        model = Story
        fields = ['id', 'title', 'creator', 'maintainer', 'category', 'public', 'description', ]

    def validate_creator(self, value):
        user =  self.context['request'].user
        if user.account.screen_name == value:
            return value
        raise serializers.ValidationError(f"Invalid operation.")
    
    def validate_maintainer(self, value):
        user =  self.context['request'].user
        qs = Group.objects.filter(name=value)
        if not qs.exist():
            raise serializers.ValidationError(f"Wrong group name.")
        elif qs[0].owner != user:
            raise serializers.ValidationError(f"Not the owner.")
        return value

    def create(self, validated_data):
        creator = Writer.objects.get(screen_name=validated_data['creator']['screen_name'])
        story = Story.objects.create(title=validated_data['title'], creator=creator, description=validated_data['description'])
        return story

class StoryDetailSerializer(serializers.ModelSerializer):
    maintainer = serializers.CharField(source='maintainer.name', required=False)
    creator = serializers.CharField(source='creator.screen_name')

    class Meta:
        model = Story
        fields = ['id', 'title', 'creator', 'maintainer', 'category', 'public', 'plots_count', 'created_at', 'description']


class StoryMoreDetailSerializer(serializers.ModelSerializer):
    participators = InfoSerializer(many=True)
    maintainer = serializers.CharField(source='maintainer.name', required=False)
    creator = serializers.CharField(source='creator.screen_name')
    rule = DisciplineSerializer(many=True)
    category = TagSerializer(many=True)

    class Meta:
        model = Story
        fields = ['id', 'title', 'creator', 'maintainer', 'category', 'public', 'plots_count', 'rule', 'created_at', 'participators', 'description']


class PlotSerializer(serializers.ModelSerializer):
    chapter = serializers.IntegerField(source='chapter.id')
    written_by = serializers.CharField(source='written_by.screen_name')
    class Meta:
        model = Plot
        fields = ['id', 'written_by', 'created_at', 'valid', 'content', 'chapter', 'updated_at']


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'created_at']

