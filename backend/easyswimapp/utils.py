from django import utils
import os
import zipfile
import datetime
from django.db import transaction
import xml.etree.ElementTree as ET
from easyswimapp.models import AgeDate,Constructor, Contact_Constructor,Contact_Meet, Meet, Pool, Facility, PointTable, Session, Event, SwimStyle, Fee, AgeGroup

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


def parse_date(date_str):
    return datetime.datetime.strptime(date_str, '%Y-%m-%d').date()

def parse_time(time_str):
    return datetime.datetime.strptime(time_str, '%H:%M:%S').time()

def parse_value(key, value):
    if 'date' in key:
        return parse_date(value)
    elif 'time' in key:
        return parse_time(value)
    elif value.isdigit():
        return int(value)
    elif key == 'value':  # Assume decimal for 'value' field in Fee model
        return float(value)
    return value

@transaction.atomic
def ler_salvar_lenex(arquivo_entrada):
    tree = ET.parse(arquivo_entrada)
    root = tree.getroot()

    for cons in root.findall('.//CONSTRUCTOR'):
        constructor_obj = Constructor.objects.create(name = cons.get('name'),
                                                 registration = cons.get('registration'),
                                                 version = cons.get('version')
                                                 )
        #constructor_obj.save()
        print("CONSTRUCTOR SAVE")
        for cont in cons.findall('./CONTACT'):
            print("ENTREI CONTACTO")
            contact = Contact_Constructor.objects.create(name = cont.get('name'),
                                                         construtor = constructor_obj,
                                                        street = cont.get('street'),
                                                        city = cont.get('city'),
                                                        zip = cont.get('zip'),
                                                        country = cont.get('country'),
                                                        email = cont.get('email'),
                                                        internet = cont.get('internet'))
            #contact.save()
            print("GUARDEI CONTACTO")
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
        #meet_obj.save()

        for agedate in meets.findall('./AGEDATE'):
            agedata_obj= AgeDate.objects.create(meet = meet_obj,
                                                value = agedate.get('value'),
                                                type = agedate.get('type'))
            #agedata_obj.save()

        for pool in meets.findall('./POOL'):
            pool_obj = Pool.objects.create(name = pool.get('name'),
                                           meet = meet_obj,
                                           lane_max = pool.get('lanemax'))
            #pool_obj.save()

        for facility in meets.findall('./FACILITY'):
            facility_obj = Facility.objects.create(city = facility.get('city'),
                                                   name = facility.get('name'),
                                                   nation = facility.get('nation'),
                                                   street = facility.get('street'),
                                                   zip = facility.get('zip'),
                                                   meet = meet_obj
                                                   )
            #facility_obj.save()
        
        for pointtable in meets.findall('./POINTTABLE'):
            pointtable_obj = PointTable.objects.create(pointtableid = pointtable.get('pointtableid'),
                                                       name = pointtable.get('name'),
                                                       meet = meet_obj,
                                                       version = pointtable.get('version'))
            #pointtable_obj.save()
        for cont in meets.findall('./CONTACT'):
            #print("ENTREI CONTACTO")
            contact = Contact_Meet.objects.create(name = cont.get('name'),
                                                  meet = meet_obj,
                                             street = cont.get('street'),
                                             zip = cont.get('zip'),
                                             email = cont.get('email'),
                                             )
            #contact.save()

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
            #session_obj.save()

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
                #event_obj.save()

                for swimstyle in  event.findall('./SWIMSTYLE'):
                    swimstyle_obj = SwimStyle.objects.create(distance = swimstyle.get('distance'),
                                                             relay_count = swimstyle.get('relaycount'),
                                                             event = event_obj,
                                                             stroke = swimstyle.get('stroke')
                                                             )
                    #swimstyle_obj.save()

                for fee in event.findall('./FEE'):
                    fee_obj = Fee.objects.create(currency = fee.get('currency'),
                                                 event = event_obj,
                                                 value = fee.get('value'))
                    #fee_obj.save()

                for agegroup in event.findall('.//AGEGROUP'):
                    agegroup_obj = AgeGroup.objects.create(agegroupid = agegroup.get('agegroupid'),
                                                            agemax = agegroup.get('agemax'),
                                                            agemin = agegroup.get('agemin'),
                                                            name = agegroup.get('name'),
                                                            event = event_obj,
                                                            handicap = agegroup.get('handicap')
                                                            )
                    #agegroup_obj.save()



        