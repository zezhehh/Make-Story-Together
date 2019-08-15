from django.db import models
from writers.models import Writer
from .constants import *


# Create your models here.
class Discipline(models.Model): 
    blacklist = models.ManyToManyField(Writer, related_name='in_blacklists', blank=True)
    whitelist = models.ManyToManyField(Writer, related_name='in_whitelists', blank=True)
    registration_time = models.IntegerField(default=-1, blank=True) # requirement of qualification # unit:day
    update_cycle = models.IntegerField(default=-1, blank=True) # requirement of updating 
    ptype = models.CharField(choices=TYPE_CHOICES, max_length=20, default=PRIVATE)
    
    def __str__(self):
        return f'{self.registration_time}:{self.update_cycle}:{self.ptype}'
