from django.db import models
from writers.models import Writer
from .constants import *


# Create your models here.
class Discipline(models.Model): 
    blacklist = models.ManyToManyField(Writer, related_name='in_blacklists')
    whitelist = models.ManyToManyField(Writer, related_name='in_whitelists')
    registration_time = models.IntegerField(default=-1, blank=True) # requirement of qualification # unit:day
    update_cycle = models.IntegerField(default=-1, blank=True) # requirement of updating 
    ptype = models.CharField(choices=TYPE_CHOICES, max_length=20, default=PRIVATE)
    
