from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import YogaSerializer      # add this
from .models import Yoga                     # add this
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
class YogaView(viewsets.ModelViewSet):       # add this
    serializer_class = YogaSerializer          # add this
    queryset = Yoga.objects.all()              # add this
# Create your views here.
# Add this CBV
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()