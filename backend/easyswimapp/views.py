from django.shortcuts import render
from django.http import HttpResponse
from .serializers import LXFSerializer
from .models import LXF
#from .utils import read_lef_file
from .utils import read_save_lenex, read_save_lenex_TeamManager
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import AgeDate_MeetManager,Constructor_MeetManager, Contact_Meet_MeetManager,Contact_Constructor_MeetManager, Meet_MeetManager, Pool_MeetManager, Facility_MeetManager, PointTable_MeetManager, Session_MeetManager, Event_MeetManager, SwimStyle_MeetManager, Fee_MeetManager, AgeGroup_MeetManager
from django.http import JsonResponse
from django.conf import settings
import os
"""
view.py
====================================
The core module of my example project
"""

# Create your views here.
def home (request):
    """
    This function handles the HTTP request and returns a greeting response.

    :param request: HttpRequest object1
    :return: HttpResponse object with a greeting message

    """
    return HttpResponse("Hello Word!-EasySwim")

class LXFView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = LXF.objects.all()
        serializer = LXFSerializer(posts, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        lxf_serializer = LXFSerializer(data=request.data)
        if lxf_serializer.is_valid():
            lxf_serializer.save()
            return Response(lxf_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', lxf_serializer.errors)
            return Response(lxf_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def read_lef_view(request):
    
   
    file_path = os.path.join(settings.MEDIA_ROOT, 'lef_files', 'test.lef')
    print("Path: "+file_path)
    try:
        read_save_lenex(file_path)
        return HttpResponse('.lef file read and processed successfully.')
    except Exception as e:
        return HttpResponse(f'An error occurred while processing the .lef file: {e}')
    
def model_data_view(request):

    meets = list(Meet_MeetManager.objects.values())  
    events = list(Event_MeetManager.objects.values())
    cons = list(Constructor_MeetManager.objects.values())   
    cont_constructor = list(Contact_Constructor_MeetManager.objects.values())
    cont_meet = list(Contact_Meet_MeetManager.objects.values())
    pool = list(Pool_MeetManager.objects.values())
    facility = list(Facility_MeetManager.objects.values())
    pointtable = list(PointTable_MeetManager.objects.values())
    session = list(Session_MeetManager.objects.values())
    swimstyle = list(SwimStyle_MeetManager.objects.values())
    fee = list(Fee_MeetManager.objects.values())
    agegroup = list(AgeGroup_MeetManager.objects.values())
   

    data = {
        'meets': meets,
        'events': events,
        'constructor': cons,
        'contact_constructor':cont_constructor,
        'contact_meet':cont_meet,
        'pool':pool,
        'facility':facility,
        'pointtable':pointtable,
        'session':session,
        'swimstyle':swimstyle,
        'fee':fee,
        'agegroup':agegroup,
        
    }
    print(meets)
    return JsonResponse(data)


def read_TeamManager_view(request):
    
    file_path = os.path.join(settings.MEDIA_ROOT, 'lef_files', 'teamManager.lef')
    print("Path: "+file_path)
    try:
        read_save_lenex_TeamManager(file_path)
        return HttpResponse('.lef file read and processed successfully.')
    except Exception as e:
        return HttpResponse(f'An error occurred while processing the .lef file: {e}')