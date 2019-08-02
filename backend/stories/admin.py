from django.contrib import admin
from .models import Story, Chapter, Character, Plot, Tag
# Register your models here.

@admin.register(Story, Chapter, Character, Plot, Tag)
class StoryAdmin(admin.ModelAdmin):
    pass
