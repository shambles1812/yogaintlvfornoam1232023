from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import YogaSerializer      # add this
from .models import Yoga                     # add this

class YogaView(viewsets.ModelViewSet):       # add this
    serializer_class = YogaSerializer          # add this
    queryset = Yoga.objects.all()              # add this
# Create your views here.
