from django.shortcuts import render
from .models import User,Logins
from .serializers import UserSerializer
# Create your views here.
from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from rest_framework.views import APIView
import bcrypt
import json
import subprocess
from rest_framework import status

def run_scrapers():
    bikram_subprocess = subprocess.Popen('python bikram_scraper.py')
    bikram_subprocess.wait()
    bikram_db_upload = subprocess.Popen('python bikram_uploader.py')
    bikram_db_upload.wait()

class UserAuthView(APIView):

    def check_password(self, username, password):

        try: 
            db_password = User.objects.get(username=username).__dict__["password"]
            if bcrypt.checkpw(str(db_password).encode("utf-8"),str(password).encode("utf-8")):
                return User.objects.get(username=username)
            else:
                return "Did not Match"
        except User.DoesNotExist:
            return None
    def check_date(self,date):
        try: 
            
            print(f"Date : {date}")
            login_obj= Logins.objects.get(login_date=date)
            if login_obj:
                login_obj.no_of_logins+=1
                login_obj.save()
                # run_scrapers()
                return "Record Exists"
                
        except Logins.DoesNotExist:
            print("Creating Login for the day and Running Scrapers")
            
            new = Logins(login_date=date,no_of_logins=1)
            new.save()
            return None
            
    def get(self,request,*args, **kwargs):
        '''
        Gets user authentication
        '''
        
        username_valid = self.check_password(request.query_params.get('user'),request.query_params.get('password'))
        if not username_valid:
            return Response(
                {"err":"login failed",
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        if username_valid == "Did not Match":
            return Response(
                {"err":"Did not match password"},status=status.HTTP_400_BAD_REQUEST
            )
        print("I got called")
        self.check_date(request.query_params.get('date'))
        serializers = UserSerializer(username_valid)
        return Response(serializers.data, status=status.HTTP_200_OK)