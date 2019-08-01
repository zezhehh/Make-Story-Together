from django.db import models
from disciplines.models import Discipline
from groups.models import Group
from stories.constants import *
from writers.models import Writer

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=20)


class Story(models.Model):
    title = models.CharField(max_length=20)
    creator = models.ForeignKey(Writer, on_delete=models.SET_NULL)
    maintainer = models.ForeignKey(Group, on_delete=models.SET_NULL)
    plots_count = models.IntegerField()
    rule = models.ManyToManyField(Discipline)
    category = models.ManyToManyField(Tag)
    public = models.CharField(choices=PUBLIC_CHOICES)

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
    written_by = models.ForeignKey(Writer, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    valid = models.BooleanField()
    content = models.TextField()
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)


class Character(models.Model):
    players = models.ManyToManyField(Writer)
    participation = models.FloatField()
    appear_at = models.ForeignKey(Plot, on_delete=models.SET_NULL)
    updated = models.ForeignKey(Plot, on_delete=models.SET_NULL)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)

