from django.contrib import admin
from .models import Writer
# Register your models here.

@admin.register(Writer)
class WriterAdmin(admin.ModelAdmin):
    pass
