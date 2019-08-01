from django.contrib.auth.models import User
from django.db import models
from stories.models import Story, Character

# Create your models here.
class Writer(models.Model):
    user = models.OneToOneField(User, on_delete=True)
    screen_name = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    stories = models.ManyToManyField(Story, related_name='writers', through=Character)
