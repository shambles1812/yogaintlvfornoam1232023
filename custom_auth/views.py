from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
# Create your views here.
from rest_framework import permissions
from rest_framework import views
from rest_framework.response import Response
from rest_framework.views import APIView
import bcrypt
import json
from rest_framework import status

class UserAuthView(APIView):

    def check_password(self, username, password):
        '''
        Helper method to get the object with given todo_id, and user_id
        '''
        try: 
            db_password = User.objects.get(username=username).__dict__["password"]
            if bcrypt.checkpw(str(db_password).encode("utf-8"),str(password).encode("utf-8")):
                return User.objects.get(username=username)
            else:
                return "Did not Match"
        except User.DoesNotExist:
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
        if username_valid == "Password Did not Match":
            return Response(
                {"err":"Did not match password"},status=status.HTTP_400_BAD_REQUEST
            )
        
        serializers = UserSerializer(username_valid)
        return Response(serializers.data, status=status.HTTP_200_OK)