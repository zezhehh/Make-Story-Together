from rest_framework import serializers
from writers.models import Writer
from .models import Discipline


class WriterSrializer(serializers.ModelSerializer):
    class Meta:
        model = Writer
        fields = ('screen_name', )
    
    def to_representation(self, obj):
        return obj.screen_name


class DisciplineSerializer(serializers.ModelSerializer):
    blacklist = WriterSrializer(many=True)
    whitelist = WriterSrializer(many=True)

    class Meta:
        model = Discipline
        fields = ('id', 'blacklist', 'whitelist', 'registration_time', 'update_cycle', )

    def create(self, validated_data):
        blacklist_user = []
        for user in validated_data['blacklist']:
            blacklist_user.append(Writer.objects.get(screen_name=user['screen_name']))
        whitelist_user = []
        for user in validated_data['whitelist']:
            whitelist_user.append(Writer.objects.get(screen_name=user['screen_name']))
        registration_time = -1 if 'registration_time' not in validated_data else validated_data['registration_time']
        update_cycle = -1 if 'update_cycle' not in validated_data else validated_data['update_cycle']
        discipline = Discipline.objects.create(registration_time=registration_time, update_cycle=update_cycle)
        discipline.blacklist.set(blacklist_user)
        discipline.whitelist.set(whitelist_user)
        return discipline

    def validate_blacklist(self, value):
        for user in value:
            if not Writer.objects.filter(screen_name=user['screen_name']).exists():
                raise serializers.ValidationError(f"No writer with screen-name {user['screen_name']}.")
        return value
    
    def validate_whitelist(self, value):
        for user in value:
            if not Writer.objects.filter(screen_name=user['screen_name']).exists():
                raise serializers.ValidationError(f"No writer with screen-name {user['screen_name']}.")
        return value
