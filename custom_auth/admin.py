from django.contrib import admin

# Register your models here.
from .models import User

class AuthUser(admin.ModelAdmin):
    list_display = ('username','password')

admin.site.register(User,AuthUser)