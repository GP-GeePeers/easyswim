import shutil
from django.shortcuts import render
from django.http import HttpResponse
from .serializers import LXFSerializer
from .models import LXF
#from .utils import read_lef_file
from .utils import read_save_lenex, read_save_lenex_TeamManager, unzip_registered_lxf, get_licenses, make_request
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import AgeDate_MeetManager,Constructor_MeetManager, Contact_Meet_MeetManager,Contact_Constructor_MeetManager, \
    Meet_MeetManager, Pool_MeetManager, Facility_MeetManager, PointTable_MeetManager, Session_MeetManager, Event_MeetManager, \
        SwimStyle_MeetManager, Fee_MeetManager, AgeGroup_MeetManager
from django.http import JsonResponse
from django.conf import settings
import os
from django.core.serializers.json import DjangoJSONEncoder


"""
view.py
====================================
The core module of my example project
"""

# Create your views here.
def home (request):
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

def read_registered_lxf(request):
    folder_path = os.path.join(settings.MEDIA_ROOT, 'registered_lxf') # vai buscar todos os ficheiros da pasta, TODO mudar para ir buscar os ficheiros de uma prova à db

    if os.path.exists(folder_path):
        
        #create temporary dir to extract the files
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp_extracted') 
        os.makedirs(temp_dir, exist_ok=True)

        unzip_registered_lxf(folder_path, temp_dir) 

        licenses_dict = get_licenses(temp_dir)

        print("LICENSES:")
        print(licenses_dict) #dicinario - key: nome do ficheiro, valor: lista com sublistas de 3 elementos [nome do atleta, licensa, data de expiracao]

        shutil.rmtree(temp_dir)

        return  HttpResponse('.lxf files read successfully!') #Response({'message': '.lxf files read successfully!'}, status=status.HTTP_201_CREATED)

    
    else:
        print("Folder does not exist: ", folder_path)
        return  HttpResponse('Error reading .lxf files!')

def read_TeamManager_view(request):
    
    file_path = os.path.join(settings.MEDIA_ROOT, 'lef_files', 'teamManager.lef')
    print("Path: "+file_path)

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
        return HttpResponse(f'An error occurred while processing the .lef file: {e}')

