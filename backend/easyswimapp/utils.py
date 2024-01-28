from django import utils
import os
import zipfile
import datetime
from django.db import transaction
import xml.etree.ElementTree as ET
from easyswimapp.models import AgeDate_MeetManager,Constructor_MeetManager, Contact_Constructor_MeetManager,Contact_Meet_MeetManager, Meet_MeetManager, Pool_MeetManager, Facility_MeetManager, PointTable_MeetManager, Session_MeetManager, Event_MeetManager, SwimStyle_MeetManager, Fee_MeetManager, AgeGroup_MeetManager, Constructor_TeamManager, Contact_Constructor_TeamManager, Meet_TeamManager, Qualify_TeamManager, Pool_TeamManager, AgeDate_TeamManager, Session_TeamManager, Event_TeamManager, SwimStyle_TeamManager, Fee_TeamManager, AgeGroup_TeamManager, Club_TeamManager, Athlete_TeamManager, Entry_Athlete_TeamManager, MeetInfo_Entry_Athlete_TeamManager, Relay_TeamManager, Entry_Relay_TeamManager, RelayPosition_TeamManager, MeetInfo_RelayPosition_TeamManager

def descompactar_todos_lxf():
    """
    Reads all .lxf files in the provided location and unzips them to .lef files.

    This function unzips .lxf files, to .lef files and saves them in the provided path.

    Parameters:
    - input_file (str): The path to the input LENEX file.
    """
    # variables for the read and unzip paths for the files
    lxf_path = 'media/lfx_files'
    lef_path = 'media/lef_files'

    # Verification of the folders
    if not os.path.isdir(lxf_path):
        raise FileNotFoundError(f"Folder not found: {lxf_path}")
    if not os.path.isdir(lef_path):
        os.makedirs(lef_path)

    # runs every .lxf file in the path provided
    for archive in os.listdir(lxf_path):
        if archive.endswith('.lxf'):
            complete_path = os.path.join(lxf_path, archive)
            base_name = os.path.splitext(archive)[0]
            destiny_path = os.path.join(lef_path, base_name + '.lef')

            # unzips .lxf file
            with zipfile.ZipFile(complete_path, 'r') as zip_ref:
                zip_ref.extractall(lef_path)

            # re names the files to .lef extension
            for extracted_file in os.listdir(lef_path):
                if extracted_file.startswith(base_name):
                    os.rename(
                        os.path.join(lef_path, extracted_file),
                        destiny_path
                    )
                    break

@transaction.atomic
def read_save_lenex(input_file):

    """
    Reads LENEX file "MeetManager" and saves the data to Django models.
    This function parses a LENEX file, extracts relevant information, and
    creates Django model instances to store the data in the database.

    Parameters:
    - input_file (str): The path to the input LENEX file.
    """
    tree = ET.parse(input_file)

    root = tree.getroot()

    for cons in root.findall('.//CONSTRUCTOR'):
        constructor_obj = Constructor_MeetManager.objects.create(name = cons.get('name'),
                                                 registration = cons.get('registration'),
                                                 version = cons.get('version')
                                                 )
    
        
        for cont in cons.findall('./CONTACT'):
            contact = Contact_Constructor_MeetManager.objects.create(name = cont.get('name'),
                                                         construtor = constructor_obj,
                                                        street = cont.get('street'),
                                                        city = cont.get('city'),
                                                        zip = cont.get('zip'),
                                                        country = cont.get('country'),
                                                        email = cont.get('email'),
                                                        internet = cont.get('internet'))
            
    for meets in root.findall('.//MEET'):
        meet_MeetManager_obj = Meet_MeetManager.objects.create(
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
            agedata_obj= AgeDate_MeetManager.objects.create(meet = meet_MeetManager_obj,
                                                value = agedate.get('value'),
                                                type = agedate.get('type'))
            
        for pool in meets.findall('./POOL'):
            pool_obj = Pool_MeetManager.objects.create(name = pool.get('name'),
                                           meet = meet_MeetManager_obj,
                                           lane_max = pool.get('lanemax'))
            
        for facility in meets.findall('./FACILITY'):
            facility_obj = Facility_MeetManager.objects.create(city = facility.get('city'),
                                                   name = facility.get('name'),
                                                   nation = facility.get('nation'),
                                                   street = facility.get('street'),
                                                   zip = facility.get('zip'),
                                                   meet = meet_MeetManager_obj
                                                   )
           
        for pointtable in meets.findall('./POINTTABLE'):
            pointtable_obj = PointTable_MeetManager.objects.create(pointtableid = pointtable.get('pointtableid'),
                                                       name = pointtable.get('name'),
                                                       meet = meet_MeetManager_obj,
                                                       version = pointtable.get('version'))
            
        for cont in meets.findall('./CONTACT'):
            #print("ENTREI CONTACTO")
            contact = Contact_Meet_MeetManager.objects.create(name = cont.get('name'),
                                                  meet = meet_MeetManager_obj,
                                             street = cont.get('street'),
                                             zip = cont.get('zip'),
                                             email = cont.get('email'),
                                             )
            
        for session in meets.findall('.//SESSION'):
            session_obj = Session_MeetManager.objects.create(date = session.get('date'),
                                                 daytime = session.get('daytime'),
                                                 name = session.get('name'),
                                                 number = session.get('number'),
                                                 warmupfrom = session.get('warmupfrom'),
                                                 warmupuntil = session.get('warmupuntil'),
                                                 meet = meet_MeetManager_obj,
                                                 maxentriesathlete = session.get('maxentriesathlete')
                                                 )

            for event in session.findall('.//EVENT'):
                event_obj = Event_MeetManager.objects.create(eventid = event.get('eventid'),
                                                 daytime = event.get('daytime'),
                                                 gender = event.get('gender'),
                                                 number = event.get('number'),
                                                 order = event.get('order'),
                                                 round = event.get('round'),
                                                 session = session_obj,
                                                 preveventid = event.get('preveventid')
                                                 )

                for swimstyle in  event.findall('./SWIMSTYLE'):
                    swimstyle_obj = SwimStyle_MeetManager.objects.create(distance = swimstyle.get('distance'),
                                                             relay_count = swimstyle.get('relaycount'),
                                                             event = event_obj,
                                                             stroke = swimstyle.get('stroke')
                                                             )

                for fee in event.findall('./FEE'):
                    fee_obj = Fee_MeetManager.objects.create(currency = fee.get('currency'),
                                                 event = event_obj,
                                                 value = fee.get('value'))

                for agegroup in event.findall('.//AGEGROUP'):
                    agegroup_obj = AgeGroup_MeetManager.objects.create(agegroupid = agegroup.get('agegroupid'),
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

@transaction.atomic
def read_save_lenex_TeamManager(input_file):

    """
    Reads LENEX file "TeamManager" and saves the data to Django models.

    This function parses a LENEX file, extracts relevant information, and
    creates Django model instances to store the data in the database.

    Parameters:
    - input_file (str): The path to the input LENEX file.
    """

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")

    tree = ET.parse(input_file)
    root = tree.getroot()

    for cons in root.findall('.//CONSTRUCTOR'):
        constructor_obj = Constructor_TeamManager.objects.create(name = cons.get('name'),
                                                 registration = cons.get('registration'),
                                                 version = cons.get('version')
                                                 )
    
        
        for cont in cons.findall('./CONTACT'):
            contact = Contact_Constructor_TeamManager.objects.create(name = cont.get('name'),
                                                         construtor = constructor_obj,
                                                        street = cont.get('street'),
                                                        city = cont.get('city'),
                                                        zip = cont.get('zip'),
                                                        country = cont.get('country'),
                                                        email = cont.get('email'),
                                                        internet = cont.get('internet'))
            
    for meets in root.findall('.//MEET'):
        meet_obj = Meet_TeamManager.objects.create(
            name=meets.get('name'),
            city=meets.get('city'),
            course=meets.get('course'),
            deadline=meets.get('deadline'),
            number=meets.get('number'),
            nation=meets.get('nation')
        )
        for qualify in meets.findall('./QUALIFY'):
            qualify_obj = Qualify_TeamManager.objects.create(from1 = qualify.get('from'),
                                                             meet = meet_obj,
                                                             until = qualify.get('until'))
        for agedate in meets.findall('./AGEDATE'):
            agedate_obj= AgeDate_TeamManager.objects.create(meet = meet_obj,
                                                            value = agedate.get('value'),
                                                            type = agedate.get('type'))
            
        for pool in meets.findall('./POOL'):
            pool_obj = Pool_TeamManager.objects.create(name = pool.get('name'),
                                                       meet = meet_obj)

        for session in meets.findall('.//SESSION'):
            session_obj = Session_TeamManager.objects.create(date = session.get('date'),
                                                             meet = meet_obj,
                                                            daytime = session.get('daytime'),
                                                            number = session.get('number')
                                                            )

            for event in session.findall('.//EVENT'):
                event_obj = Event_TeamManager.objects.create(eventid = event.get('eventid'),
                                                             session = session_obj,
                                                            gender = event.get('gender'),
                                                            number = event.get('number'),
                                                            preveventid = event.get('preveventid')
                                                            )

                for swimstyle in  event.findall('./SWIMSTYLE'):
                    swimstyle_obj = SwimStyle_TeamManager.objects.create(distance = swimstyle.get('distance'),
                                                                        relay_count = swimstyle.get('relaycount'),
                                                                        event = event_obj,
                                                                        stroke = swimstyle.get('stroke')
                                                                        )

                for fee in event.findall('./FEE'):
                    fee_obj = Fee_TeamManager.objects.create(currency = fee.get('currency'),
                                                            event = event_obj,
                                                            value = fee.get('value'))

                for agegroup in event.findall('.//AGEGROUP'):
                    agegroup_obj = AgeGroup_TeamManager.objects.create(agegroupid = agegroup.get('agegroupid'),
                                                                        agemax = agegroup.get('agemax'),
                                                                        agemin = agegroup.get('agemin'),
                                                                        gender = agegroup.get('gender'),
                                                                        event = event_obj
                                                                        )
                    
        for club in meets.findall('.//CLUB'):
            club_obj = Club_TeamManager.objects.create(clubid = club.get('clubid'),
                                                        name = club.get('name'),
                                                        shortname = club.get('shortname'),
                                                        meet = meet_obj,
                                                        code = club.get('code'),
                                                        nation = club.get('nation'),
                                                        region = club.get('region')
                                                        )
            
            for athletes in club.findall('.//ATHLETE'):
                athletes_obj = Athlete_TeamManager.objects.create(athleteid = athletes.get('athleteid'),
                                                                club = club_obj,
                                                                lastname = athletes.get('lastname'),
                                                                firstname = athletes.get('firstname'),
                                                                gender = athletes.get('gender'),
                                                                license = athletes.get('license'),
                                                                birthdate = athletes.get('birthdate')
                                                                )
                
                for entries_athletes in athletes.findall('.//ENTRY'):
                    entries_athletes_obj = Entry_Athlete_TeamManager.objects.create(eventid = entries_athletes.get('eventid'),
                                                                    athlete = athletes_obj,
                                                                    entrytime = entries_athletes.get('entrytime')
                                                                )
                    
                    for meetinfo in entries_athletes.findall('./MEETINFO'):
                        meetinfo_obj = MeetInfo_Entry_Athlete_TeamManager.objects.create(course = meetinfo.get('course'),
                                                                                        entry = entries_athletes_obj,
                                                                                        date = meetinfo.get('date'),
                                                                                        city = meetinfo.get('city'),
                                                                                        nation = meetinfo.get('nation'),
                                                                                        name = meetinfo.get('name')
                                                                )
                        

            for relay in club.findall('.//RELAY'):
                relay_obj = Relay_TeamManager.objects.create(relayid = relay.get('relayid'),
                                                            club = club_obj,
                                                            number = relay.get('number'),
                                                            agetotalmax = relay.get('agetotalmax'),
                                                            agetotalmin = relay.get('agetotalmin'),
                                                            agemin = relay.get('agemin'),
                                                            agemax = relay.get('agemax'),
                                                            gender = relay.get('gender')
                                                            )
                
                for entries_relay in relay.findall('.//ENTRY'):
                    entries_relay_obj = Entry_Relay_TeamManager.objects.create(eventid = entries_relay.get('eventid'),
                                                                        relay = relay_obj,
                                                                        entrytime = entries_relay.get('entrytime')
                                                                    )
                    
                    for relayposition in entries_relay.findall('.//RELAYPOSITION'):
                        relayposition_obj = RelayPosition_TeamManager.objects.create(number = relayposition.get('number'),
                                                                               entry = entries_relay_obj,
                                                                               athleteid = relayposition.get('athleteid')
                                                                            )
                        
                        for meetinfo_relayposition in relayposition.findall('./MEETINFO'):
                            meetinfo_relayposition_obj = MeetInfo_RelayPosition_TeamManager.objects.create(course = meetinfo_relayposition.get('course'),
                                                                                relaypositon = relayposition_obj,
                                                                                qualificationtime = meetinfo_relayposition.get('qualificationtime')
                                                                                )