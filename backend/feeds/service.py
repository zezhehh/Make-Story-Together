from django.db.models.signals import post_save
from django.dispatch import receiver
from stories.models import Story
from groups.models import Group
from .models import Feed
from .constants import *

@receiver(post_save, sender=Story)
def new_story_feed(sender, **kwargs):
    if kwargs.get('created', False):
        story = kwargs.get('instance')
        Feed.objects.create(content_object=story, feed_type=NEW_STORY)

@receiver(post_save, sender=Group)
def new_group_feed(sender, **kwargs):
    if kwargs.get('created', False):
        group = kwargs.get('instance')
        Feed.objects.create(content_object=group, feed_type=NEW_GROUP)
