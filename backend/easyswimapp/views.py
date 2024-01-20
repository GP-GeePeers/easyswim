from django.shortcuts import render
from django.http import HttpResponse
from .serializers import LXFSerializer
from .models import LXF
#from .utils import read_lef_file
from .utils import ler_salvar_lenex
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import AgeDate,Constructor, Contact_Meet,Contact_Constructor, Meet, Pool, Facility, PointTable, Session, Event, SwimStyle, Fee, AgeGroup
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
    
    #file_path = '/easyswim/backend/media/lef_files/Meet_20230926151151490_4.lef'
    file_path = os.path.join(settings.MEDIA_ROOT, 'lef_files', 'test.lef')
    print("Caminho: "+file_path)
    try:
        ler_salvar_lenex(file_path)
        return HttpResponse('Arquivo .lef lido e processado com sucesso.')
    except Exception as e:
        return HttpResponse(f'Ocorreu um erro ao processar o arquivo .lef: {e}')
    
def model_data_view(request):

    meets = list(Meet.objects.values())  # Converte QuerySet em uma lista de dicionários
    events = list(Event.objects.values())
    cons = list(Constructor.objects.values())   # Converte QuerySet em uma lista de dicionários
    cont_constructor = list(Contact_Constructor.objects.values())
    cont_meet = list(Contact_Meet.objects.values())
    pool = list(Pool.objects.values())
    facility = list(Facility.objects.values())
    pointtable = list(PointTable.objects.values())
    session = list(Session.objects.values())
    swimstyle = list(SwimStyle.objects.values())
    fee = list(Fee.objects.values())
    agegroup = list(AgeGroup.objects.values())
   

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
