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
        user =  self.context['request'].user.account
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
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = ['id', 'title', 'creator', 'maintainer', 'category', 'public', 'plots_count', 'chapters_count', 'rule', 'created_at', 'participators', 'description', 'liked']

    def get_liked(self, obj):
        if 'request' not in self.context:
            return False
        writer =  self.context['request'].user
        if writer.is_anonymous:
            return False
        return obj.likes.filter(from_user=writer.account).exists()

class MiniPlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plot
        fields = ['id', 'created_at']

class CharacterSerializer(serializers.ModelSerializer):
    player = serializers.CharField(source='player.screen_name')
    story = serializers.IntegerField(source='story.id')
    appear_at = MiniPlotSerializer()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Character
        fields = ['id', 'description', 'name', 'player', 'story', 'appear_at', 'liked']

    def validate_player(self, value):
        user =  self.context['request'].user
        if user.account.screen_name == value:
            return value
        raise serializers.ValidationError(f"Invalid operation.")

    def get_liked(self, obj):
        if 'request' not in self.context:
            return False
        writer =  self.context['request'].user.account
        return obj.likes.filter(from_user=writer).exists()

    def create(self, validated_data):
        player = Writer.objects.get(screen_name=validated_data['player']['screen_name'])
        story = Story.objects.get(id=validated_data['story']['id'])
        character = Character.objects.create(player=player, name=validated_data['name'], story=story, description=validated_data['description'])
        return character


class PlotSerializer(serializers.ModelSerializer):
    chapter = serializers.IntegerField(source='chapter.id')
    written_by = serializers.CharField(source='written_by.screen_name')
    story_id = serializers.IntegerField(source='chapter.story.id')
    liked = serializers.SerializerMethodField()
    written_as = CharacterSerializer()

    class Meta:
        model = Plot
        fields = ['id', 'written_by', 'story_id', 'created_at', 'valid', 'content', 'chapter', 'updated_at', 'written_as', 'liked']
        
    def get_liked(self, obj):
        if 'request' not in self.context:
            return False
        writer =  self.context['request'].user.account
        return obj.likes.filter(from_user=writer).exists()


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'created_at']
