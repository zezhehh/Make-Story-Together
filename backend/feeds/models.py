from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from feeds.constants import *
from groups.models import Group
from stories.models import Chapter, Character, Story, Plot
from writers.models import Writer

# Create your models here.
class Feed(models.Model):
    feed_type = models.CharField(choices=FEED_TYPE_CHOICES, max_length=20)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def feed_content(self):
        if self.feed_type == NEW_STORY:
            return format_new_story(self.content_object)
        elif self.feed_type == NEW_GROUP:
            return format_new_group(self.content_object)
        elif self.feed_type == POPULAR_PLOT:
            return format_popular_plot(self.content_object)
        elif self.feed_type == POPULAR_CHARACTER:
            return format_popular_character(self.content_object)
        elif self.feed_type == POPULAR_STORY:
            return format_popular_story(self.content_object)
