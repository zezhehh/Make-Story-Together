from rest_framework import serializers
from .models import Story
from groups.models import Group

class StorySerializer(serializers.ModelSerializer):
    maintainer = serializers.CharField(source='maintainer.name')
    creator = serializers.CharField(source='creator.screen_name')

    class Meta:
        model = Story
        fields = ['id', 'title', 'creator', 'maintainer', 'category', 'public', ]

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
        maintainer = Group.objects.get(name=validated_data['maintainer']['name'])
        story = Story.objects.create(name=validated_data['title'], creator=creator, maintainer=maintainer)
        GroupMember.objects.create(member=owner, group=group)
        return group
