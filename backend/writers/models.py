from django.contrib.auth.models import User
from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from likes.models import Like

# Create your models here.
class Writer(models.Model):
    user = models.OneToOneField(User, on_delete=True, related_name='account')
    screen_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = GenericRelation(Like, related_query_name='writer')

    def __str__(self):
        return self.screen_name

    @property
    def username(self):
        return self.user.username
