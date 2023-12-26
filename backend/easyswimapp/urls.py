from django.urls import path
from . import views

urlpatterns = [
    path('lxf/', views.LXFView.as_view(), name= 'lxf_list'),
]