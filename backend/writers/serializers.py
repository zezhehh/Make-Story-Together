from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Writer
from stories.models import Plot, Story, Character
from groups.models import Group, GroupMember
from likes.models import Like


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=6, max_length=20)
    password = serializers.CharField(min_length=8, max_length=20)
    screen_name = serializers.CharField(min_length=1, max_length=15)

    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            return value
        raise serializers.ValidationError("Username exsited.")

    def validate_screen_name(self, value):
        if not Writer.objects.filter(screen_name=value).exists():
            return value
        raise serializers.ValidationError("Screen-name exsited.")


class SigninSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

from .timeline_constant import *
from collections import OrderedDict

class InfoSerializer(serializers.ModelSerializer):
    update_cycle = serializers.SerializerMethodField()
    likes_number = serializers.SerializerMethodField()
    timeline = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Writer
        fields = ['id', 'screen_name', 'username', 'created_at', 'update_cycle', 'likes_number', 'timeline', 'liked']

    def get_liked(self, obj):
        if 'request' not in self.context:
            return False
        writer =  self.context['request'].user
        if writer.is_anonymous:
            return False
        return obj.likes.filter(from_user=writer.account).exists()

    # #plot / day in recent week
    def get_update_cycle(self, obj):
        one_week_ago = timezone.now().date() - datetime.timedelta(days=7)
        plot_count = Plot.objects.filter(written_by=obj, updated_at__gte=one_week_ago).count()
        return round(plot_count / 7, 2)
    
    def get_likes_number(self, obj):
        return Like.objects.filter(from_user=obj).count()
    
    def get_timeline(self, obj):
        timeline = {}
        timeline[TIMELINE_LABEL[REGISTRATION]] = obj.created_at
        if Story.objects.filter(creator=obj).exists():
            timeline[TIMELINE_LABEL[FIRST_STORY]] = Story.objects.filter(creator=obj).order_by('created_at')[0].created_at
        if Group.objects.filter(owner=obj).exists():
            timeline[TIMELINE_LABEL[FIRST_GROUP]] = Group.objects.filter(owner=obj).order_by('created_at')[0].created_at
        if Plot.objects.filter(written_by=obj).exists():
            timeline[TIMELINE_LABEL[FIRST_PLOT]] = Plot.objects.filter(written_by=obj).order_by('created_at')[0].created_at
        if Character.objects.filter(player=obj, appear_at__isnull=False).exists():
            timeline[TIMELINE_LABEL[FIRST_CHARACTER]] = Character.objects.filter(player=obj, appear_at__isnull=False).order_by('appear_at__created_at')[0].appear_at.created_at
        if Like.objects.filter(from_user=obj).exists():
            timeline[TIMELINE_LABEL[FIRST_LIKE]] = Like.objects.filter(from_user=obj).order_by('created_at')[0].created_at
        if GroupMember.objects.filter(member=obj).exists():
            timeline[TIMELINE_LABEL[FIRST_JOIN]] = GroupMember.objects.filter(member=obj).order_by('joined_at')[0].joined_at
        timeline_sorted = sorted(timeline.items(), key=lambda kv: kv[1], reverse=False)
        ordered_timeline = OrderedDict()
        for key, value in timeline_sorted:
            ordered_timeline[key] = value
        # - 第10个创作的故事
        # - 第100个plot
        # - 第100次like
        return ordered_timeline
