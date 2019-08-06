from rest_framework import serializers
from writers.models import Writer
from .models import Group, GroupMember

class GroupSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.screen_name')

    class Meta:
        model = Group
        fields = ('id', 'name', 'owner', 'description', )

    def validate_owner(self, value):
        user =  self.context['request'].user
        if user.account.screen_name == value:
            return value
        raise serializers.ValidationError(f"Invalid operation.")

    def create(self, validated_data):
        owner = Writer.objects.get(screen_name=validated_data['owner']['screen_name'])
        qs = Group.objects.filter(name=validated_data['name'])
        if qs.exists():
            return qs[0]
        group = Group.objects.create(name=validated_data['name'], owner=owner, description=validated_data['description'])
        GroupMember.objects.create(member=owner, group=group)
        return group
