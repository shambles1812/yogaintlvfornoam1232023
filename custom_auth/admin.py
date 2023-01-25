from django.contrib import admin

# Register your models here.
from .models import User,Logins

class AuthUser(admin.ModelAdmin):
    list_display = ('username','password')

class LoginsDate(admin.ModelAdmin):
    list_display = ('login_date','no_of_logins')
admin.site.register(User,AuthUser)
admin.site.register(Logins,LoginsDate)