# backend/urls.py

from django.contrib import admin
from django.urls import path, include                   # add this
from rest_framework import routers                      # add this
from yoga import views                                  # add this

router = routers.DefaultRouter()                        # add this
router.register(r'yoga', views.YogaView, 'yoga')       # add this

urlpatterns = [
    path('admin/', admin.site.urls),         
    path('api/', include(router.urls))                   # add this
]