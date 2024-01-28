from django import utils
import os
import zipfile
import datetime
from django.db import transaction
import xml.etree.ElementTree as ET

import requests
from easyswimapp.models import AgeDate,Constructor, Contact_Constructor,Contact_Meet, Meet, Pool, Facility, PointTable, Session, Event, SwimStyle, Fee, AgeGroup
from django.conf import settings
from os.path import join

def descompactar_todos_lxf():
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


def unzip_registered_lxf(folder_path, temp_dir):

    files = os.listdir(folder_path) #lista de ficheiros da pasta

    for file_name in files:
        file_path = join(folder_path, file_name)

        with zipfile.ZipFile(file_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)


def get_licenses(temp_dir):
    licenses = []

    files = os.listdir(temp_dir)

    for file in files:

        file_path = os.path.join(temp_dir, file) 

        with open(file_path, 'r') as opened_file:
            xml_data = opened_file.read()
            root = ET.fromstring(xml_data)
            for athlete_element in root.findall('.//ATHLETE'):
                athlete_info = extract_athlete_info(athlete_element)
                licenses.append(athlete_info['license'])

    return licenses


def extract_athlete_info(athlete_element):
    return {
        'athleteid': athlete_element.get('athleteid'),
        'lastname': athlete_element.get('lastname'),
        'firstname': athlete_element.get('firstname'),
        'gender': athlete_element.get('gender'),
        'license': athlete_element.get('license'),
        'birthdate': athlete_element.get('birthdate')
    }


def make_request(licenses):
        url = 'https://fpnsystem.fpnatacao.pt/api/exam'

        headers = {}

        json_licenses = {'licenses': licenses}
        
        auth = ("validexam@fpnatacao.pt", "#LH26pZNDlJ)")

        response = requests.post(url, headers=headers, json = json_licenses, auth=auth) #data = json.dumps(json_licenses)

        print(response.status_code)

        if response.status_code == 200:
            result = response.json()
            print(result)
        else:
            print(f"Error: {response.status_code}, {response.text}")