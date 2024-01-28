from django.urls import path
from . import views
from .views import read_lef_view
from .views import model_data_view

urlpatterns = [
    path('lxf/', views.LXFView.as_view(), name= 'lxf_list'),
    path('read-lef/', read_lef_view, name='read-lef'),
    path('model-data/', model_data_view, name='model-data-view'),
    path('', views.DashboardView.as_view(), name='home'),

]

"""
URL patterns for the EasySwim app.
api/ is the root of the API. The URLs are:

- 'lxf/': Maps to the LXFView class in views.py, used for listing LXF files.
- 'read-lef/': Maps to the read_lef_view function in views.py, used for reading LEF files.
- 'model-data/': Maps to the model_data_view function in views.py, used for viewing model data.

"""