from django.contrib import admin
from .models import Group, GroupMember
# Register your models here.

@admin.register(Group, GroupMember)
class GroupAdmin(admin.ModelAdmin):
    pass
