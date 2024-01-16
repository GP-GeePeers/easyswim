from django.db import models

# Superuser:
# Username: admin
# Email: admin@email.com
# Password: admin
       
# Create your models here.

class LXF(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    lxf_file = models.FileField(upload_to='lxf_files')

    def __str__(self):
        return self.title

class Constructor(models.Model):
    name = models.CharField(max_length=100)
    registration = models.CharField(max_length=100)
    version = models.CharField(max_length=20)

class Contact(models.Model):
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    email = models.EmailField()
    internet = models.URLField()

    def __str__(self):
        return self.name

class Meet(models.Model):
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

class Pool(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    lane_max = models.IntegerField()

class Facility(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    nation = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)

class PointTable(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    pointtableid = models.IntegerField()
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=20)

class Session(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    date = models.DateField()
    daytime = models.TimeField()
    name = models.CharField(max_length=100)
    number = models.IntegerField()
    warmupfrom = models.TimeField()
    warmupuntil = models.TimeField()
    maxentriesathlete = models.IntegerField()

    def __str__(self):
        return self.name

class Event(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    eventid = models.IntegerField()
    daytime = models.TimeField()
    gender = models.CharField(max_length=1, choices=[('F', 'Female'), ('M', 'Male')])
    number = models.IntegerField()
    order = models.IntegerField()
    round = models.CharField(max_length=50)
    preveventid = models.IntegerField()

    def __str__(self):
        return self.eventid

class SwimStyle(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    distance = models.IntegerField()
    relay_count = models.IntegerField()
    stroke = models.CharField(max_length=50)

class Fee(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    currency = models.CharField(max_length=3)
    value = models.DecimalField(max_digits=6, decimal_places=2)

class AgeGroup(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    agegroupid = models.IntegerField()
    agemax = models.IntegerField()
    agemin = models.IntegerField()
    name = models.CharField(max_length=100)
    handicap = models.CharField(max_length=50)