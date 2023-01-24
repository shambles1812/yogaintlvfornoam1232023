# backend/urls.py

from django.contrib import admin
from django.urls import path, include, re_path               # add this
from rest_framework import routers                      # add this
from yoga import views                                  # add this
from custom_auth import views as auth_views
from django.views.generic import TemplateView

router = routers.DefaultRouter()                        # add this
router.register(r'yogas', views.YogaView, 'yoga')       # add this

urlpatterns = [
    path('test/admin', admin.site.urls),         
    path('test/api/', include(router.urls)),  
    path('test/api/yoga_date',views.YogaDetailApiView.as_view() ),
    path('test/custom_auth',auth_views.UserAuthView.as_view() ),
    # re_path('',TemplateView.as_view(template_name="index.html"))
]