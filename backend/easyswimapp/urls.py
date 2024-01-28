from django.urls import path
from . import views
from .views import read_lef_view, model_data_view, read_registered_lxf


urlpatterns = [
    path('lxf/', views.LXFView.as_view(), name='lxf_list'),
    path('read-lef/', read_lef_view, name='read-lef'),
    path('model-data/', model_data_view, name='model-data-view'),
    path('registered-lxf/', read_registered_lxf, name='reagistered-lxf')
]