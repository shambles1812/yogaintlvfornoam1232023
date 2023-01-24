from django.contrib import admin

# Register your models here.
from .models import Yoga

class YogaAdmin(admin.ModelAdmin):
    list_display = ('studio_logo', 'class_date', 'class_name')

# Register your models here.

admin.site.register(Yoga, YogaAdmin)