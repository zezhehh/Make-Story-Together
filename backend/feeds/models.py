from django.db import models
from feeds.constants import CONTENT_TYPE_CHOICES
from groups.models import Group
from stories.models import Chapter, Character, Story, Plot
from writers.models import Writer

# Create your models here.
class Feed(models.Model):
    creator = models.ForeignKey(Writer, on_delete=models.SET_NULL)
    character = models.ForeignKey(Character, on_delete=models.SET_NULL)
    plot = models.ForeignKey(Plot, on_delete=models.SET_NULL)
    story = models.ForeignKey(Story, on_delete=models.SET_NULL)
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL)
    content_type = models.CharField(choices=CONTENT_TYPE_CHOICES)
