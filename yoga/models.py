from django.db import models

# Create your models here.

class Yoga(models.Model):
    # title = models.CharField(max_length=120)
    # description = models.TextField()
    # completed = models.BooleanField(default=  False)
    studio_logo = models.CharField(max_length=200)
    class_date = models.DateField()
    class_name = models.CharField(max_length=50)
    class_start_hour = models.CharField(max_length=20)
    class_end_hour = models.CharField(default= None, max_length=20)
    class_teacher = models.CharField(max_length=50)
    studio_address = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=20)
    url = models.CharField(max_length=200)
    studio_name = models.CharField(default = None, max_length=200,null=True,blank=True)

    