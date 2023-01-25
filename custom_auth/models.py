from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=200)

class Logins(models.Model):
    login_date = models.DateField()
    no_of_logins = models.IntegerField()