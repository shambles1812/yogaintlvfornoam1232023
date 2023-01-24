# backend/urls.py

from django.contrib import admin
from django.urls import path, include, re_path               # add this
from rest_framework import routers                      # add this
from yoga import views                                  # add this
from django.views.generic import TemplateView

router = routers.DefaultRouter()                        # add this
router.register(r'yoga', views.YogaView, 'yoga')       # add this

urlpatterns = [
    path('admin/', admin.site.urls),         
    path('api/', include(router.urls)),                   # add this
    re_path('.*',TemplateView.as_view(template_name="index.html"))
]