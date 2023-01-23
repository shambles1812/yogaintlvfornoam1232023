from rest_framework import serializers # This is important
from .models import Yoga

class YogaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yoga
        fields = ('id', 'title', 'description', 'completed')