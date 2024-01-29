from django.urls import path
from . import views
from .views import read_lef_view, model_data_view, read_registered_lxf, read_TeamManager_view



urlpatterns = [
    path('lxf/', views.LXFView.as_view(), name='lxf_list'),
    path('read-lef/', read_lef_view, name='read-lef'),
    path('read-TeamManager/', read_TeamManager_view, name='read-TeamManager'),
    path('model-data/', model_data_view, name='model-data-view'),
    path('registered-lxf/', read_registered_lxf, name='reagistered-lxf')
    path('', views.DashboardView.as_view(), name='home'),
]
