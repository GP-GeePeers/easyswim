from django.db import models

# Superuser:
# Username: admin
# Email: admin@email.com
# Password: admin

class LXF(models.Model):
    """
    Represents an LXF model.

    Attributes:
    - title (str): The title of the LXF.
    - description (str): The description of the LXF.
    - lxf_file (FileField): The LXF file uploaded to the system.

    Methods:
    - __str__(): Returns the title of the LXF as a string.
    """
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    lxf_file = models.FileField(upload_to='lxf_files')

    def __str__(self):
        return self.title


class Constructor_MeetManager(models.Model):
    """
    Represents a Constructor model.

    Attributes:
    - name (str): The name of the constructor.
    - registration (str): The registration information of the constructor.
    - version (str): The version of the constructor.

    Methods:
    - __str__(): Returns the name of the constructor as a string.
    """
    name = models.CharField(max_length=100)
    registration = models.CharField(max_length=100)
    version = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Contact_Constructor_MeetManager(models.Model):
    """
    Represents contact information for a Constructor.

    Attributes:
    - constructor (Constructor): The associated Constructor.
    - name (str): The name of the contact.
    - street (str): The street address of the contact.
    - city (str): The city of the contact.
    - zip (str): The ZIP code of the contact.
    - country (str): The country of the contact.
    - email (EmailField): The email address of the contact.
    - internet (URLField): The internet URL of the contact.

    Methods:
    - __str__(): Returns the name of the contact as a string.
    """
    construtor = models.ForeignKey(Constructor_MeetManager, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    email = models.EmailField()
    internet = models.URLField()

    def __str__(self):
        return self.name


class Meet_MeetManager(models.Model):
    """
    Represents a Meet model.

    Attributes:
    - city (str): The city where the meet is held.
    - name (str): The name of the meet.
    - course (str): The type of course (e.g., short course, long course).
    - deadline (DateField): The deadline for the meet.
    - number (int): The meet number.
    - organizer (str): The organizer of the meet.
    - organizer_url (URLField): The URL of the meet organizer.
    - reservecount (int): The reserve count for the meet.
    - startmethod (int): The start method for the meet.
    - timing (str): The timing of the meet.
    - type (str): The type of the meet.
    - nation (str): The nation hosting the meet.
    - maxentriesathlete (int): The maximum number of entries per athlete.

    Methods:
    - __str__(): Returns the name of the meet as a string.
    """
    city = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    course = models.CharField(max_length=50)
    deadline = models.DateField()
    number = models.IntegerField()
    organizer = models.CharField(max_length=100)
    organizer_url = models.URLField()
    reservecount = models.IntegerField()
    startmethod = models.IntegerField()
    timing = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    nation = models.CharField(max_length=50)
    maxentriesathlete = models.IntegerField()

    def __str__(self):
        return self.name


class Contact_Meet_MeetManager(models.Model):
    """
    Represents contact information for a Meet.

    Attributes:
    - meet (Meet): The associated Meet.
    - name (str): The name of the contact.
    - street (str): The street address of the contact.
    - phone (str): The phone number of the contact.
    - zip (str): The ZIP code of the contact.
    - email (EmailField): The email address of the contact.

    Methods:
    - __str__(): Returns the name of the contact as a string.
    """
    meet = models.ForeignKey(Meet_MeetManager, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    phone = models.CharField(max_length=200)
    zip = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Pool_MeetManager(models.Model):
    """
    Represents a swimming pool associated with a Meet.

    Attributes:
    - meet (Meet): The associated Meet.
    - name (str): The name of the pool.
    - lane_max (int): The maximum number of lanes in the pool.

    Methods:
    - __str__(): Returns the name of the pool as a string.
    """
    meet = models.ForeignKey(Meet_MeetManager, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    lane_max = models.IntegerField()

    def __str__(self):
        return self.name

class AgeDate_MeetManager(models.Model):
    """
    Represents an age date associated with a Meet.

    Attributes:
    - meet (Meet): The associated Meet.
    - value (DateField): The value of the age date.
    - type (str): The type of the age date.

    Methods:
    - __str__(): Returns the type of the age date as a string.
    """
    meet = models.ForeignKey(Meet_MeetManager, on_delete=models.CASCADE)
    value  = models.DateField()
    type = models.CharField(max_length=200)

    def __str__(self):
        return self.type

class Facility_MeetManager(models.Model):
    """
    Represents a facility associated with a Meet.

    Attributes:
    - meet (Meet): The associated Meet.
    - city (str): The city where the facility is located.
    - name (str): The name of the facility.
    - nation (str): The nation of the facility.
    - street (str): The street address of the facility.
    - zip (str): The ZIP code of the facility.

    Methods:
    - __str__(): Returns the name of the facility as a string.
    """
    meet = models.ForeignKey(Meet_MeetManager, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    nation = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class PointTable_MeetManager(models.Model):
    """
    Represents a point table associated with a Meet.

    Attributes:
    - meet (Meet): The associated Meet.
    - pointtableid (int): The ID of the point table.
    - name (str): The name of the point table.
    - version (str): The version of the point table.

    Methods:
    - __str__(): Returns the name of the point table as a string.
    """
    meet = models.ForeignKey(Meet_MeetManager, on_delete=models.CASCADE)
    pointtableid = models.IntegerField()
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Session_MeetManager(models.Model):
    """
    Represents a session associated with a Meet.

    Attributes:
    - meet (Meet): The associated Meet.
    - date (DateField): The date of the session.
    - daytime (TimeField): The daytime of the session.
    - name (str): The name of the session.
    - number (int): The number of the session.
    - warmupfrom (TimeField): The warm-up start time of the session.
    - warmupuntil (TimeField): The warm-up end time of the session.
    - maxentriesathlete (int): The maximum number of entries per athlete.

    Methods:
    - __str__(): Returns the name of the session as a string.
    """
    meet = models.ForeignKey(Meet_MeetManager, on_delete=models.CASCADE)
    date = models.DateField()
    daytime = models.TimeField()
    name = models.CharField(max_length=100)
    number = models.IntegerField()
    warmupfrom = models.TimeField()
    warmupuntil = models.TimeField()
    maxentriesathlete = models.IntegerField()

    def __str__(self):
        return self.name

class Event_MeetManager(models.Model):
    """
    Represents an event associated with a Session.

    Attributes:
    - session (Session): The associated Session.
    - eventid (int): The ID of the event.
    - daytime (TimeField): The daytime of the event.
    - gender (str): The gender of the event ('F' for Female, 'M' for Male).
    - number (int): The number of the event.
    - order (int): The order of the event.
    - round (str): The round of the event.
    - preveventid (int): The ID of the previous event.

    Methods:
    - __str__(): Returns the ID of the event as a string.
    """
    session = models.ForeignKey(Session_MeetManager, on_delete=models.CASCADE)
    eventid = models.IntegerField()
    daytime = models.TimeField(null=True)
    gender = models.CharField(max_length=50, choices=[('F', 'Female'), ('M', 'Male')], null=True)
    number = models.IntegerField()
    order = models.IntegerField()
    round = models.CharField(max_length=50)
    preveventid = models.IntegerField()

    def __str__(self):
        return str(self.eventid)

class SwimStyle_MeetManager(models.Model):
    """
    Represents a swim style associated with an Event.

    Attributes:
    - event (Event): The associated Event.
    - distance (int): The distance of the swim style.
    - relay_count (int): The relay count of the swim style.
    - stroke (str): The stroke of the swim style.

    Methods:
    - __str__(): Returns the stroke of the swim style as a string.
    """
    event = models.ForeignKey(Event_MeetManager, on_delete=models.CASCADE)
    distance = models.IntegerField()
    relay_count = models.IntegerField()
    stroke = models.CharField(max_length=50)

    def __str__(self):
        return self.stroke

class Fee_MeetManager(models.Model):
    """
    Represents a fee associated with an Event.

    Attributes:
    - event (Event): The associated Event.
    - currency (str): The currency of the fee.
    - value (DecimalField): The value of the fee.

    Methods:
    - __str__(): Returns the value of the fee as a string.
    """
    event = models.ForeignKey(Event_MeetManager, on_delete=models.CASCADE)
    currency = models.CharField(max_length=3)
    value = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return str(self.value)

class AgeGroup_MeetManager(models.Model):
    """
    Represents an age group associated with an Event.

    Attributes:
    - event (Event): The associated Event.
    - agegroupid (int): The ID of the age group.
    - agemax (int): The maximum age of the age group.
    - agemin (int): The minimum age of the age group.
    - name (str): The name of the age group.
    - handicap (str): The handicap information for the age group.

    Methods:
    - __str__(): Returns the name of the age group as a string.
    """
    event = models.ForeignKey(Event_MeetManager, on_delete=models.CASCADE)
    agegroupid = models.IntegerField()
    agemax = models.IntegerField()
    agemin = models.IntegerField()
    name = models.CharField(max_length=100)
    handicap = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.name
    
    ################################ MODELS TEAM MANAGER ####################

class Constructor_TeamManager(models.Model):
    name = models.CharField(max_length=100)
    registration = models.CharField(max_length=100)
    version = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Contact_Constructor_TeamManager(models.Model):
    construtor = models.ForeignKey(Constructor_TeamManager, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    email = models.EmailField()
    internet = models.URLField()

    def __str__(self):
        return self.name




class Meet_TeamManager(models.Model):
    city = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    course = models.CharField(max_length=50)
    deadline = models.DateField()
    number = models.IntegerField()
    nation = models.CharField(max_length=50)

    def __str__(self):
        return self.name
   

class Qualify_TeamManager(models.Model):
    meet = models.ForeignKey(Meet_TeamManager, on_delete=models.CASCADE)
    from1 = models.DateField()
    until = models.DateField()

    def __str__(self):
        return str(self.from1)

class Pool_TeamManager(models.Model):
    meet = models.ForeignKey(Meet_TeamManager, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class AgeDate_TeamManager(models.Model):
    meet = models.ForeignKey(Meet_TeamManager, on_delete=models.CASCADE)
    value  = models.DateField()
    type = models.CharField(max_length=200)

    def __str__(self):
        return self.type


class Session_TeamManager(models.Model):
    meet = models.ForeignKey(Meet_TeamManager, on_delete=models.CASCADE)
    date = models.DateField()
    daytime = models.TimeField()
    number = models.IntegerField()
    

    def __str__(self):
        return str(self.number)

class Event_TeamManager(models.Model):
    session = models.ForeignKey(Session_TeamManager, on_delete=models.CASCADE)
    eventid = models.IntegerField()
    gender = models.CharField(max_length=50, choices=[('F', 'Female'), ('M', 'Male')],null=True,blank=True)
    number = models.IntegerField()
    preveventid = models.IntegerField()

    def __str__(self):
        return str(self.eventid)

class SwimStyle_TeamManager(models.Model):
    event = models.ForeignKey(Event_TeamManager, on_delete=models.CASCADE)
    distance = models.IntegerField()
    relay_count = models.IntegerField()
    stroke = models.CharField(max_length=50)

    def __str__(self):
        return self.stroke

class Fee_TeamManager(models.Model):
    event = models.ForeignKey(Event_TeamManager, on_delete=models.CASCADE)
    currency = models.CharField(max_length=3)
    value = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return str(self.value)

class AgeGroup_TeamManager(models.Model):
    event = models.ForeignKey(Event_TeamManager, on_delete=models.CASCADE)
    agegroupid = models.IntegerField()
    gender = models.CharField(max_length=50, choices=[('F', 'Female'), ('M', 'Male')], null = True,blank=True)
    agemax = models.IntegerField()
    agemin = models.IntegerField()
    

    def __str__(self):
        return str(self.agegroupid)
    
class Club_TeamManager(models.Model):
    meet = models.ForeignKey(Meet_TeamManager, on_delete=models.CASCADE)
    clubid = models.IntegerField()
    name = models.CharField(max_length=500)
    shortname = models.CharField(max_length=20)
    code = models.CharField(max_length=20)
    nation = models.CharField(max_length=20)
    region = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Athlete_TeamManager(models.Model):
    club = models.ForeignKey(Club_TeamManager, on_delete=models.CASCADE)
    athleteid = models.IntegerField()
    lastname = models.CharField(max_length=500)
    firstname = models.CharField(max_length=500)
    gender = models.CharField(max_length=50, choices=[('F', 'Female'), ('M', 'Male')], null = True,blank=True)
    license = models.IntegerField()
    birthdate = models.DateField()

    def __str__(self):
        return self.firstname
    
class Entry_Athlete_TeamManager(models.Model):
    athlete = models.ForeignKey(Athlete_TeamManager, on_delete=models.CASCADE, null=True)
    eventid = models.IntegerField()
    entrytime = models.TimeField()

    def __str__(self):
        return str(self.eventid)

class MeetInfo_Entry_Athlete_TeamManager(models.Model):
    entry = models.ForeignKey(Entry_Athlete_TeamManager, on_delete=models.CASCADE)
    course = models.CharField(max_length=50)
    date = models.DateField(null = True,blank=True)
    city = models.CharField(max_length=100, null = True,blank=True)
    nation = models.CharField(max_length=20, null = True,blank=True)
    name = models.CharField(max_length=500, null = True,blank=True)

    def __str__(self):
        return self.name

class Relay_TeamManager(models.Model):
    club = models.ForeignKey(Club_TeamManager, on_delete=models.CASCADE)
    relayid = models.IntegerField()
    number = models.IntegerField()
    agetotalmax = models.IntegerField()
    agetotalmin = models.IntegerField()
    agemin = models.IntegerField()
    agemax = models.IntegerField()
    gender = models.CharField(max_length=50, choices=[('F', 'Female'), ('M', 'Male')], null = True,blank=True)
    
    def __str__(self):
        return str(self.relayid)
    
class Entry_Relay_TeamManager(models.Model):
    relay = models.ForeignKey(Relay_TeamManager, on_delete=models.CASCADE, null=True)
    eventid = models.IntegerField()
    entrytime = models.TimeField()

    def __str__(self):
        return str(self.eventid)

class RelayPosition_TeamManager(models.Model):
    entry = models.ForeignKey(Entry_Relay_TeamManager, on_delete=models.CASCADE, null=True)
    number = models.IntegerField()
    athleteid = models.IntegerField()

    def __str__(self):
        return str(self.athleteid)

class MeetInfo_RelayPosition_TeamManager(models.Model):
    relaypositon = models.ForeignKey(RelayPosition_TeamManager, on_delete=models.CASCADE, null = True,blank=True)
    course = models.CharField(max_length=50)
    qualificationtime = models.CharField(max_length=10)

    def __str__(self):
        return self.course
    