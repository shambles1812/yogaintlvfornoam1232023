from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import YogaSerializer      # add this
from .models import Yoga                     # add this
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime
from rest_framework import permissions
import subprocess
class YogaView(viewsets.ModelViewSet):       # add this
    serializer_class = YogaSerializer          # add this
    queryset = Yoga.objects.all()              # add this
    
from subprocess import call
from unicodedata import category
from urllib.parse import urlencode,quote
import datetime
import time


class YogaDetailApiView(APIView):


    def get_schedules(self, date):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try:
            print(date)
            my_data = Yoga.objects.filter(class_date=date).values()
            return my_data
        except Yoga.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, *args, **kwargs):
        '''
        Retrieves the schedules for the date
        '''
        
        schedules = self.get_schedules(request.query_params.get('date'))
        
        # subprocess.run(["python","bikram_scraper.py"])
        if not schedules:
            return Response(
                {"err": "No Schedules Found"},
                status=status.HTTP_400_BAD_REQUEST
            )
        time.sleep(1.5)
        # serializer = YogaSerializer(schedules)
        return Response(schedules, status=status.HTTP_200_OK)
