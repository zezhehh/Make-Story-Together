from django.db import models
from disciplines.models import Discipline
from writers.models import Writer

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Writer, on_delete=models.SET_NULL, related_name='owned_groups', null=True)
    description = models.TextField(blank=True, default='Describe your group now!')
    rule = models.ManyToManyField(Discipline)
    members = models.ManyToManyField(Writer, related_name='groups', through='GroupMember')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class GroupMember(models.Model):
    member = models.ForeignKey(Writer, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    
