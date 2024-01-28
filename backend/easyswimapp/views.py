from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import LXFSerializer
from .models import LXF
#from .utils import read_lef_file
from .utils import read_save_lenex
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import AgeDate_MeetManager,Constructor_MeetManager, Contact_Meet_MeetManager,Contact_Constructor_MeetManager, Meet_MeetManager, Pool_MeetManager, Facility_MeetManager, PointTable_MeetManager, Session_MeetManager, Event_MeetManager, SwimStyle_MeetManager, Fee_MeetManager, AgeGroup_MeetManager
from django.http import JsonResponse
from django.conf import settings
import os
from django.core.serializers.json import DjangoJSONEncoder


"""
views.py
====================================
This module contains the views for the EasySwim app, handling HTTP requests and providing responses.

"""

def home(request):
    """
    Renders the home page.

    :param request: HttpRequest object
    :return: HttpResponse object containing the rendered home page
    """
    return HttpResponse(request)

class DashboardView(APIView):
    http_method_names = ['get', 'post']

    def get(self, request):
        """
        Handles GET requests for the dashboard view.

        :param request: HttpRequest object
        :return: JsonResponse object containing internal database information
        """
        
        return model_data_view(request)

class LXFView(APIView):
    """
    View for LXF file upload.

    This view allows users to upload LXF files, and it supports both GET and POST requests.

    :param request: HttpRequest object
    :return: Response object with serialized LXF data
    """
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests for LXF data.

        :param request: HttpRequest object
        :return: Response object with serialized LXF data
        """
        posts = LXF.objects.all()
        serializer = LXFSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests for LXF file uploads.

        :param request: HttpRequest object with LXF file data
        :return: Response object indicating success or failure
        """
        lxf_serializer = LXFSerializer(data=request.data)
        if lxf_serializer.is_valid():
            lxf_serializer.save()
            return Response(lxf_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(lxf_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def read_lef_view(request):
    """
    Reads and processes a .lef file.

    Expects a GET request and returns an HttpResponse indicating the success or failure of the file processing.

    :param request: HttpRequest object
    :return: HttpResponse indicating success or failure of .lef file processing
    """
   
    file_path = os.path.join(settings.MEDIA_ROOT, 'lef_files', 'test.lef')
    print("Path: "+file_path)
    try:
        read_save_lenex(file_path)
        return HttpResponse('.lef file read and processed successfully.')
    except Exception as e:
        return HttpResponse(f'An error occurred while processing the .lef file: {e}')
    

def model_data_view(request):
    """
    Retrieves data from various models and returns it as a JSON response.
    :param request: HttpRequest object
    :return: JSON response containing data from various models
    """
    try:
        meets = list(Meet.objects.values())
        '''events = list(Event.objects.values())
        cons = list(Constructor.objects.values())
        #cont_constructor = list(Contact_Constructor.objects.values())
        cont_meet = list(Contact_Meet.objects.values())
        pool = list(Pool.objects.values())
        facility = list(Facility.objects.values())
        pointtable = list(PointTable.objects.values())
        session = list(Session.objects.values())
        swimstyle = list(SwimStyle.objects.values())
        fee = list(Fee.objects.values())
        agegroup = list(AgeGroup.objects.values())
        '''

        data = {
            'meets': meets,
        }

        return JsonResponse(data, safe=False, encoder=DjangoJSONEncoder)
    except Exception as e:
        error_message = f"Error: {str(e)}"
        return JsonResponse({'error': error_message}, status=500)
