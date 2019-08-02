from django.db import models
from feeds.constants import CONTENT_TYPE_CHOICES
from groups.models import Group
from stories.models import Chapter, Character, Story, Plot
from writers.models import Writer

# Create your models here.
class Feed(models.Model):
    creator = models.ForeignKey(Writer, on_delete=models.SET_NULL, null=True)
    character = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True)
    plot = models.ForeignKey(Plot, on_delete=models.SET_NULL, null=True)
    story = models.ForeignKey(Story, on_delete=models.SET_NULL, null=True)
    chapter = models.ForeignKey(Chapter, on_delete=models.SET_NULL, null=True)
    content_type = models.CharField(choices=CONTENT_TYPE_CHOICES, max_length=20)
