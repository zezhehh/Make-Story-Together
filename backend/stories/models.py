from django.db import models
from disciplines.models import Discipline
from django.contrib.postgres.fields import ArrayField
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
    rule = models.ManyToManyField(Discipline, blank=True)
    category = models.ManyToManyField(Tag, blank=True)
    public = models.CharField(choices=PUBLIC_CHOICES, max_length=20, default=PUBLIC)
    participators = models.ManyToManyField(Writer, related_name='stories', through='Character', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, default='Describe the story now!')

    def __str__(self):
        return f'{self.title}:{self.plots_count}'
    
    @property
    def plots_count(self):
        return Plot.objects.filter(chapter__story=self).count()

    @property
    def chapters_count(self):
        return self.chapters.count()
         

class Chapter(models.Model):
    title = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='chapters')
    # rule = models.ManyToManyField(Discipline)

    def __str__(self):
        return self.title

    @property
    def plots_count(self):
        return Plot.objects.filter(chapter=self).count()


class Plot(models.Model):
    written_by = models.ForeignKey(Writer, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    valid = models.BooleanField(default=False)
    content = models.TextField()
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='plots')
    written_as = models.ForeignKey('stories.Character', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.written_by.screen_name}:{self.content}:{self.chapter.title}:{self.chapter.story.title}'

    def save(self, *args, **kwargs):
        self.content = self.content.strip()
        super(Plot, self).save(*args, **kwargs)

from django.contrib.postgres.fields import ArrayField

class Character(models.Model):
    name = models.CharField(max_length=20, default='Narration')
    player = models.ForeignKey(Writer, on_delete=models.SET_NULL, null=True)
    participation = models.FloatField(default=0)
    appear_at = models.ForeignKey(Plot, on_delete=models.SET_NULL, null=True, related_name='appear_characters')
    updated = models.ForeignKey(Plot, on_delete=models.SET_NULL, null=True, related_name='update_characters')
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    description = models.TextField(default='introduce the character')
    alis = ArrayField(
        models.CharField(max_length=20), default=list, blank=True
    )
    default = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}:{self.story.title}:{self.player.screen_name}'

    def save(self, *args, **kwargs):
        if self.name not in self.alis:
            self.alis = self.alis.append(self.name)
        if not self.alis:
            self.alis = [self.name, ]
        super(Character, self).save(*args, **kwargs)
