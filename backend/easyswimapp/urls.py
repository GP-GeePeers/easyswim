from django.urls import path
from . import views
from .views import read_lef_view
from .views import model_data_view

urlpatterns = [
    path('lxf/', views.LXFView.as_view(), name= 'lxf_list'),
    path('read-lef/', read_lef_view, name='read-lef'),
    path('model-data/', model_data_view, name='model-data-view'),
]