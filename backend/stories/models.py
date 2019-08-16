from django.db import models
from disciplines.models import Discipline
from groups.models import Group
from stories.constants import *
from writers.models import Writer

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Story(models.Model):
    title = models.CharField(max_length=20)
    creator = models.ForeignKey(Writer, on_delete=models.SET_NULL, null=True, related_name='owned_stories')
    maintainer = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='stories')
    plots_count = models.IntegerField(default=0)
    rule = models.ManyToManyField(Discipline, blank=True)
    category = models.ManyToManyField(Tag, blank=True)
    public = models.CharField(choices=PUBLIC_CHOICES, max_length=20, default=PUBLIC)
    participators = models.ManyToManyField(Writer, related_name='stories', through='Character', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Chapter(models.Model):
    title = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    rule = models.ManyToManyField(Discipline)

    def __str__(self):
        return self.title


class Plot(models.Model):
    written_by = models.ForeignKey(Writer, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField()
    content = models.TextField()
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)


class Character(models.Model):
    name = models.CharField(max_length=20, default='person')
    players = models.ForeignKey(Writer, on_delete=models.SET_NULL, null=True)
    participation = models.FloatField()
    appear_at = models.ForeignKey(Plot, on_delete=models.SET_NULL, null=True, related_name='appear_characters')
    updated = models.ForeignKey(Plot, on_delete=models.SET_NULL, null=True, related_name='update_characters')
    story = models.ForeignKey(Story, on_delete=models.CASCADE)

    def __str__(self):
        return self.name