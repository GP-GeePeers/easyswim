from django import utils
import os
import zipfile
import datetime
from django.db import transaction
import xml.etree.ElementTree as ET
from easyswimapp.models import AgeDate,Constructor, Contact_Constructor,Contact_Meet, Meet, Pool, Facility, PointTable, Session, Event, SwimStyle, Fee, AgeGroup

def descompactar_todos_lxf():

    """
    Extracts all .lxf files in the specified folder.

    This function iterates over all .lxf files in the source folder,
    extracts and renames them to .lef files in the destination folder.
    """
      
    # Caminhos dos Ficheiros. Se necessário pode ser alterado para a função receber os argumentos
    caminho_pasta_origem = 'media/lfx_files'
    caminho_pasta_destino = 'media/lef_files'

    # Garante que as pastas existem
    if not os.path.isdir(caminho_pasta_origem):
        raise FileNotFoundError(f"Pasta não encontrada: {caminho_pasta_origem}")
    if not os.path.isdir(caminho_pasta_destino):
        os.makedirs(caminho_pasta_destino)

    # Itera todos os arquivos .lxf na pasta 
    for arquivo in os.listdir(caminho_pasta_origem):
        if arquivo.endswith('.lxf'):
            caminho_completo_arquivo = os.path.join(caminho_pasta_origem, arquivo)
            nome_base = os.path.splitext(arquivo)[0]
            caminho_arquivo_destino = os.path.join(caminho_pasta_destino, nome_base + '.lef')

            # Descompacta o arquivo .lxf
            with zipfile.ZipFile(caminho_completo_arquivo, 'r') as zip_ref:
                zip_ref.extractall(caminho_pasta_destino)

            # Da Rename aos arquivos descompactados para a extensão .lef
            for arquivo_extraido in os.listdir(caminho_pasta_destino):
                if arquivo_extraido.startswith(nome_base):
                    os.rename(
                        os.path.join(caminho_pasta_destino, arquivo_extraido),
                        caminho_arquivo_destino
                    )
                    break

@transaction.atomic
def read_save_lenex(arquivo_entrada):

    """
    Reads LENEX file and saves the data to Django models.

    This function parses a LENEX file, extracts relevant information, and
    creates Django model instances to store the data in the database.

    Parameters:
    - arquivo_entrada (str): The path to the input LENEX file.
    """
        
    tree = ET.parse(arquivo_entrada)
    root = tree.getroot()

    for cons in root.findall('.//CONSTRUCTOR'):
        constructor_obj = Constructor.objects.create(name = cons.get('name'),
                                                 registration = cons.get('registration'),
                                                 version = cons.get('version')
                                                 )
    
        print("CONSTRUCTOR SAVE")
        for cont in cons.findall('./CONTACT'):
            contact = Contact_Constructor.objects.create(name = cont.get('name'),
                                                         construtor = constructor_obj,
                                                        street = cont.get('street'),
                                                        city = cont.get('city'),
                                                        zip = cont.get('zip'),
                                                        country = cont.get('country'),
                                                        email = cont.get('email'),
                                                        internet = cont.get('internet'))
            
    for meets in root.findall('.//MEET'):
        meet_obj = Meet.objects.create(
            name=meets.get('name'),
            city=meets.get('city'),
            course=meets.get('course'),
            deadline=meets.get('deadline'),
            number=meets.get('number'),
            organizer=meets.get('organizer'),
            organizer_url=meets.get('organizer.url'),
            reservecount=meets.get('reservecount'),
            startmethod=meets.get('startmethod'),
            timing=meets.get('timing'),
            type=meets.get('type'),
            nation=meets.get('nation'),
            maxentriesathlete=meets.get('maxentriesathlete')
        )
        

        for agedate in meets.findall('./AGEDATE'):
            agedata_obj= AgeDate.objects.create(meet = meet_obj,
                                                value = agedate.get('value'),
                                                type = agedate.get('type'))
            
        for pool in meets.findall('./POOL'):
            pool_obj = Pool.objects.create(name = pool.get('name'),
                                           meet = meet_obj,
                                           lane_max = pool.get('lanemax'))
            
        for facility in meets.findall('./FACILITY'):
            facility_obj = Facility.objects.create(city = facility.get('city'),
                                                   name = facility.get('name'),
                                                   nation = facility.get('nation'),
                                                   street = facility.get('street'),
                                                   zip = facility.get('zip'),
                                                   meet = meet_obj
                                                   )
           
        for pointtable in meets.findall('./POINTTABLE'):
            pointtable_obj = PointTable.objects.create(pointtableid = pointtable.get('pointtableid'),
                                                       name = pointtable.get('name'),
                                                       meet = meet_obj,
                                                       version = pointtable.get('version'))
            
        for cont in meets.findall('./CONTACT'):
            #print("ENTREI CONTACTO")
            contact = Contact_Meet.objects.create(name = cont.get('name'),
                                                  meet = meet_obj,
                                             street = cont.get('street'),
                                             zip = cont.get('zip'),
                                             email = cont.get('email'),
                                             )
            
        for session in meets.findall('.//SESSION'):
            session_obj = Session.objects.create(date = session.get('date'),
                                                 daytime = session.get('daytime'),
                                                 name = session.get('name'),
                                                 number = session.get('number'),
                                                 warmupfrom = session.get('warmupfrom'),
                                                 warmupuntil = session.get('warmupuntil'),
                                                 meet = meet_obj,
                                                 maxentriesathlete = session.get('maxentriesathlete')
                                                 )

            for event in session.findall('.//EVENT'):
                event_obj = Event.objects.create(eventid = event.get('eventid'),
                                                 daytime = event.get('daytime'),
                                                 gender = event.get('gender'),
                                                 number = event.get('number'),
                                                 order = event.get('order'),
                                                 round = event.get('round'),
                                                 session = session_obj,
                                                 preveventid = event.get('preveventid')
                                                 )

                for swimstyle in  event.findall('./SWIMSTYLE'):
                    swimstyle_obj = SwimStyle.objects.create(distance = swimstyle.get('distance'),
                                                             relay_count = swimstyle.get('relaycount'),
                                                             event = event_obj,
                                                             stroke = swimstyle.get('stroke')
                                                             )

                for fee in event.findall('./FEE'):
                    fee_obj = Fee.objects.create(currency = fee.get('currency'),
                                                 event = event_obj,
                                                 value = fee.get('value'))

                for agegroup in event.findall('.//AGEGROUP'):
                    agegroup_obj = AgeGroup.objects.create(agegroupid = agegroup.get('agegroupid'),
                                                            agemax = agegroup.get('agemax'),
                                                            agemin = agegroup.get('agemin'),
                                                            name = agegroup.get('name'),
                                                            event = event_obj,
                                                            handicap = agegroup.get('handicap')
                                                            )
                    



def upload_blob(bucket_name, source_file_name, destination_blob_name):

    """
    Uploads a file to Google Cloud Storage bucket.

    Parameters:
    - bucket_name (str): The name of the Google Cloud Storage bucket.
    - source_file_name (str): The path to the local file to upload.
    - destination_blob_name (str): The destination blob name in the bucket.
    """

    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Optional: set a generation-match precondition to avoid potential race conditions
    # and data corruptions. The request to upload is aborted if the object's
    # generation number does not match your precondition. For a destination
    # object that does not yet exist, set the if_generation_match precondition to 0.
    # If the destination object already exists in your bucket, set instead a
    # generation-match precondition using its generation number.
    generation_match_precondition = 0

    blob.upload_from_filename(source_file_name, if_generation_match=generation_match_precondition)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )
def download_blob(bucket_name, source_blob_name, destination_file_name):

    """
    Downloads a file from Google Cloud Storage bucket.

    Parameters:
    - bucket_name (str): The name of the Google Cloud Storage bucket.
    - source_blob_name (str): The source blob name in the bucket.
    - destination_file_name (str): The path to the local file for download.
    """

    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    # Download the blob to a local file
    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")


        
