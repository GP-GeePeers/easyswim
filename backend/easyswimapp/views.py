from collections import defaultdict
import shutil
from django.shortcuts import get_object_or_404, render
from django.http import FileResponse, HttpResponse, JsonResponse
from .serializers import LXFSerializer
from .models import LXF, Athlete_TeamManager, Club_TeamManager, Meet_TeamManager
# from .utils import read_lef_file
from .utils import read_save_lenex, read_save_lenex_TeamManager, unzip_registered_lxf, get_licenses, make_request, upload_blob, extract_lxf_file, read_preview_lenex, download_blob
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import AgeDate_MeetManager, Constructor_MeetManager, Contact_Meet_MeetManager, Contact_Constructor_MeetManager, \
    Meet_MeetManager, Pool_MeetManager, Facility_MeetManager, PointTable_MeetManager, Session_MeetManager, Event_MeetManager, \
    SwimStyle_MeetManager, Fee_MeetManager, AgeGroup_MeetManager
from django.http import JsonResponse
from django.conf import settings
import os
from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers
import uuid
from datetime import datetime
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


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

        return list_meets(request)  # model_data_view(request)


class LXFMeetView(APIView):
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
        download_requested = request.query_params.get('download', False)

        meet_id = request.query_params.get('id')
        meet = list(Meet_MeetManager.objects.filter(id=meet_id).values())[0]
        bucket_path = str(meet.get('bucket_path'))
        # Split the bucket path to get the file name
        file_name = bucket_path.split('/')[-1]
        if download_requested:

            bucket_name = "easyswim"
            destination_file_name = os.path.join(
                settings.MEDIA_ROOT, 'lxf_files', file_name)
            print(""+bucket_path)

            download_blob(bucket_name, bucket_path, destination_file_name)

            response = FileResponse(open(destination_file_name, 'rb'))
            response.headers['Content-Disposition'] = f'attachment; filename="{file_name}"+".lxf"'
            return response
            # return JsonResponse(data={'notification': 'Ficheiro submetido com sucesso!'}, status=status.HTTP_200_OK)

            # return JsonResponse(data={'notification': 'Download concluído com sucesso!'}, status=status.HTTP_200_OK)
        else:
            # Se não for uma solicitação de download, continue com a lógica existente
            posts = LXF.objects.all()
            serializer = LXFSerializer(posts, many=True)
            return JsonResponse(data={'notification': 'Download Failed!'}, status=status.HTTP_201_CREATED)

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests for LXF file uploads.

        :param request: HttpRequest object with LXF file data
        :return: Response object indicating success or failure
        """

        lxf_serializer = LXFSerializer(data=request.data)

        print(request.data)

        if lxf_serializer.is_valid():
            dir = os.path.join(settings.MEDIA_ROOT, 'lxf_files')
            # Create a folder for the uploaded file
            if not os.path.exists(dir):
                os.mkdir(dir)
            lxf_serializer.save()
            # Create a folder for the extracted file

            file_title = request.data['title'].replace(" ", "_")
            file_path = os.path.join(dir, file_title)

            # Save the file
            uuid_str = str(uuid.uuid4())
            upload_blob("easyswim", file_path, "meets/+"+uuid_str+".lxf")

            # Descompact the file
            file_path_s = os.path.join(settings.MEDIA_ROOT, 'lef_files')

            basename, _ = extract_lxf_file(dir, file_path_s, file_title)
            file_path_s = os.path.join(
                settings.MEDIA_ROOT, 'lef_files', basename+".lef")
            print("Path: "+file_path_s)

            # Read the file
            read_save_lenex(file_path_s, "meets/+"+uuid_str+".lxf")
            os.remove(file_path_s)
            os.remove(file_path)

            return JsonResponse(data={'notification': 'Ficheiro submetido com sucesso!'}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(data={'notification': 'File not found'}, status=status.HTTP_400_BAD_REQUEST)


class MeetPreviewView(APIView):
    """
    Handles POST requests for LXF file uploads.

    :return: JsonResponse indicating success or failure
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
        lxf_serializer = LXFSerializer(data=request.data)

        print(request.data)

        if lxf_serializer.is_valid():
            dir = os.path.join(settings.MEDIA_ROOT, 'lxf_files')

            # Create a folder for the uploaded file
            if not os.path.exists(dir):
                os.mkdir(dir)

            lxf_serializer.save()

            # Create a folder for the extracted file
            file_path = os.path.join(dir, request.data['title'])

            # Check if the file exists before extracting
            if os.path.exists(file_path):
                file_path_s = os.path.join(settings.MEDIA_ROOT, 'lef_files')
                basename, _ = extract_lxf_file(
                    dir, file_path_s, request.data['title'])
                file_path_s = os.path.join(
                    settings.MEDIA_ROOT, 'lef_files', basename + ".lef")
                print("Path: " + file_path_s)

                # Read the file
                meet = read_preview_lenex(file_path_s)
                os.remove(file_path_s)
                os.remove(file_path)

                return JsonResponse(meet, safe=False)
            else:
                return JsonResponse(data={'error': 'File not found'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse(data={'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class LXFTeamView(APIView):
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
        print("Received POST request for LXF file upload.")
        meet_id = request.data['id']
        print("Meet ID: "+meet_id)
        try:
            meet_obj = Meet_MeetManager.objects.get(id=meet_id)
            request_data_copy = request.data.copy()
            request_data_copy.pop('id', None)

            meet = list(Meet_MeetManager.objects.filter(
                id=meet_id).values())[0]
            print(meet)

            meet_bucket_uuid = str(meet.get('bucket_path')).split("/")[1][:-4]

            lxf_serializer = LXFSerializer(data=request_data_copy)

            print(request.data)

            if lxf_serializer.is_valid():
                print("Valid")
                dir = os.path.join(settings.MEDIA_ROOT, 'lxf_files')
                # Create a folder for the uploaded file
                if not os.path.exists(dir):
                    os.mkdir(dir)
                lxf_serializer.save()
                # Create a folder for the extracted file
                file_path = os.path.join(dir, request.data['title'])

                # Save the file
                uuid_str = str(uuid.uuid4())
                upload_blob("easyswim", file_path,
                            meet_bucket_uuid+"/+"+uuid_str+".lxf")

                # Descompact the file
                file_path_s = os.path.join(settings.MEDIA_ROOT, 'lef_files')
                basename, _ = extract_lxf_file(
                    dir, file_path_s, request.data['title'])
                file_path_s = os.path.join(
                    settings.MEDIA_ROOT, 'lef_files', basename+".lef")

                print("Path: "+file_path_s)

                # Read the file
                read_save_lenex_TeamManager(file_path_s, meet_obj)
                os.remove(file_path_s)
                os.remove(file_path)

                return JsonResponse(data={'success': 'Ficheiro submetido com sucesso!'}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse(data={'error': 'Ficheiro Invalido'}, status=status.HTTP_400_BAD_REQUEST)
        except Meet_MeetManager.DoesNotExist:
            return JsonResponse(data={'error': 'Meet Manager não encontrado'}, status=status.HTTP_404_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        meet_id = request.data['id']
        print(meet_id)

        if meet_id is None:
            return JsonResponse({'error': 'Empty ID!'})

        try:
            meet_id = int(meet_id)
        except ValueError:
            return JsonResponse({'error': 'Invalid ID!'})

        Meet_MeetManager.objects.filter(id=meet_id).update(is_active=2)

        data = {'message': 'Meet deleted successfully'}

        return JsonResponse(data)


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
        meets = list(Meet_MeetManager.objects.values())
        '''events = list(Event_MeetManager.objects.values())
        cons = list(Constructor_MeetManager.objects.values())   
        cont_constructor = list(Contact_Constructor_MeetManager.objects.values())
        cont_meet = list(Contact_Meet_MeetManager.objects.values())
        pool = list(Pool_MeetManager.objects.values())
        facility = list(Facility_MeetManager.objects.values())
        pointtable = list(PointTable_MeetManager.objects.values())
        session = list(Session_MeetManager.objects.values())
        swimstyle = list(SwimStyle_MeetManager.objects.values())
        fee = list(Fee_MeetManager.objects.values())
        agegroup = list(AgeGroup_MeetManager.objects.values())'''

        data = {
            'meets': meets,
        }

        return JsonResponse(data, safe=False, encoder=DjangoJSONEncoder)
    except Exception as e:
        return HttpResponse(f'An error occurred while processing the .lef file: {e}')


def read_registered_lxf(request):
    # vai buscar todos os ficheiros da pasta, TODO mudar para ir buscar os ficheiros de uma prova à db
    folder_path = os.path.join(settings.MEDIA_ROOT, 'registered_lxf')

    if os.path.exists(folder_path):
        # create temporary dir to extract the files
        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp_extracted')
        os.makedirs(temp_dir, exist_ok=True)

        unzip_registered_lxf(folder_path, temp_dir)

        licenses_dict = get_licenses(temp_dir)

        print("LICENSES:")
        # dicinario - key: nome do ficheiro, valor: lista com sublistas de 3 elementos [nome do atleta, licensa, data de expiracao]
        print(licenses_dict)

        shutil.rmtree(temp_dir)

        # Response({'message': '.lxf files read successfully!'}, status=status.HTTP_201_CREATED)
        return HttpResponse('.lxf files read successfully!')
    else:
        print("Folder does not exist: ", folder_path)
        return HttpResponse('Error reading .lxf files!')


def read_meet_manager(request):

    file_path = os.path.join(
        settings.MEDIA_ROOT, 'lef_files', 'teamManager.lef')
    print("Path: "+file_path)

    try:
        meets = list(Meet_MeetManager.objects.values())

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


def list_meets(request):
    """
    Retrieves data from various models and returns it as a JSON response.
    :param request: HttpRequest object
    :return: JSON response containing data from various models
    """

    meet_id = request.GET.get('id')

    if meet_id is not None:
        meets = list(Meet_MeetManager.objects.filter(id=meet_id).values())
    else:
        meets = list(Meet_MeetManager.objects.values())

    # Iterate through meets and modify values
    for meet in meets:
        deadline = meet.get('deadline')
        is_active = 1

        # Your conditions for setting is_active based on deadline
        if deadline is not None and deadline <= datetime.now().date() and meet.get('is_active') != 2:
            # Meet_MeetManager.objects.filter(id=meet_id).update(is_active=0)
            is_active = 0
        elif meet.get('is_active') == 2:
            is_active = 2

        # Update the 'is_active' field in the meet dictionary
        meet['is_active'] = is_active

    data = {
        'meets': meets,
    }

    return JsonResponse(data)


def list_TeamManager_by_Meet(request):
    meet_id = request.GET.get('id')

    try:
        meet_id = int(meet_id)
    except (ValueError, TypeError):
        return JsonResponse(data={'error': 'ID do Meet inválido'}, status=400)

    meet_manager = get_object_or_404(Meet_MeetManager, id=meet_id)

    team_managers = Meet_TeamManager.objects.filter(meet=meet_manager)

    serialized_clubs = defaultdict(dict)

    for team_manager in team_managers:
        print(
            '\033[91m' + f'name {team_manager.name} - city {team_manager.city}' + '\033[0m')
        club = get_object_or_404(Club_TeamManager, meet=team_manager)
        print(club)

        if serialized_clubs[club.clubid]:
            serialized_clubs[club.clubid].update({
                'id': club.clubid,
                'name': club.name,
                'shortname': club.shortname,
                'athletes': list_Athletes_by_Club(club.clubid)
            })
        else:
            serialized_clubs[club.clubid] = {
                'id': club.clubid,
                'name': club.name,
                'shortname': club.shortname,
                'athletes': list_Athletes_by_Club(club.clubid)
            }

    serialized_clubs_list = list(serialized_clubs.values())

    return JsonResponse(data={'club': serialized_clubs_list}, status=200)


def list_Athletes_by_Club(club_id):
    try:
        club_id = int(club_id)
    except (ValueError, TypeError):
        return JsonResponse(data={'error': 'ID do Clube inválido'}, status=400)

    clubs = list(Club_TeamManager.objects.filter(clubid=club_id))
    sorted_clubs = sorted(clubs, key=lambda x: x.id, reverse=True)

    if sorted_clubs:
        club = sorted_clubs[0]

        athletes = list(Athlete_TeamManager.objects.filter(club=club))
        athletes_list = [{'name': f'{athlete.firstname} {athlete.lastname}',
                          'license': athlete.license} for athlete in athletes]

        return athletes_list
    else:
        return []
