from django.contrib import admin
from .models import Discipline

# Register your models here.
@admin.register(Discipline)
class DisciplineAdmin(admin.ModelAdmin):
    pass
