from rest_framework import serializers # This is important
from .models import Yoga

class YogaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yoga
        fields = (
            'studio_logo',
             'class_date',
              'class_name', 
              'class_start_hour',
              'class_end_hour',
              'class_teacher',
              'studio_address',
              'phone_number',
              'url',
              'studio_name')