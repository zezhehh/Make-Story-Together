from django.db import models
from disciplines.models import Discipline

# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    rule = models.ManyToManyField(Discipline)
