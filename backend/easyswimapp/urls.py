from django.urls import include, path
from . import views
from .views import read_lef_view, model_data_view, read_registered_lxf, read_meet_manager, delete_meet,list_TeamManager_by_Meet



urlpatterns = [
    path('lxf-meet-preview/',views.MeetPreviewView.as_view(), name='meet-preview'),
    path('lxf-meet-confirmation/', views.LXFMeetView.as_view(), name='meet-confirmation'),
    path('lxf-team-confirmation/', views.LXFTeamView.as_view(), name='team-confirmation'),
    path('lxf-delete/', delete_meet, name='delete-meet'),
    path('read-lef/', read_lef_view, name='read-lef'),
    path('read-TeamManager/', read_meet_manager, name='read-TeamManager'),
    path('model-data/', model_data_view, name='model-data-view'),
    path('registered-lxf/', read_registered_lxf, name='reagistered-lxf'),
    path('list-TeamManager-by-Meet/', list_TeamManager_by_Meet, name='list-TeamManager-by-Meet'),
    path('', views.DashboardView.as_view(), name='home'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
