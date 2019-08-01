from django.db import models
from writers.models import Writer

# Create your models here.
class Discipline(models.Model):
    blacklist = models.ManyToManyField(Writer)
    whitelist = models.ManyToManyField(Writer)
    registration_time = models.IntegerField(null=True, blank=True) # requirement of qualification
    update_cycle = models.IntegerField(null=True, blank=True) # requirement of updating 


