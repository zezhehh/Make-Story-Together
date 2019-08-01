from django.db import models
from disciplines.models import Discipline
from writers.models import Writer

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    rule = models.ManyToManyField(Discipline)

class GroupMember(models.Model):
    member = models.ForeignKey(Writer, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    
