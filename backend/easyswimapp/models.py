from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Superuser:
# Username: admin
# Email: admin@email.com
# Password: admin
       
# Create your models here.


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email
 


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

    def __str__(self):
        return self.name

class Contact_Constructor(models.Model):
    construtor = models.ForeignKey(Constructor, on_delete=models.CASCADE)
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
   

class Contact_Meet(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    phone = models.CharField(max_length=200)
    zip = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Pool(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    lane_max = models.IntegerField()

    def __str__(self):
        return self.name

class AgeDate(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    value  = models.DateField()
    type = models.CharField(max_length=200)

    def __str__(self):
        return self.type

class Facility(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    nation = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class PointTable(models.Model):
    meet = models.ForeignKey(Meet, on_delete=models.CASCADE)
    pointtableid = models.IntegerField()
    name = models.CharField(max_length=100)
    version = models.CharField(max_length=20)

    def __str__(self):
        return self.name

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
    daytime = models.TimeField(null = True)
    gender = models.CharField(max_length=50, choices=[('F', 'Female'), ('M', 'Male')], null = True)
    number = models.IntegerField()
    order = models.IntegerField()
    round = models.CharField(max_length=50)
    preveventid = models.IntegerField()

    def __str__(self):
        return str(self.eventid)

class SwimStyle(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    distance = models.IntegerField()
    relay_count = models.IntegerField()
    stroke = models.CharField(max_length=50)

    def __str__(self):
        return self.stroke

class Fee(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    currency = models.CharField(max_length=3)
    value = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return str(self.value)

class AgeGroup(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    agegroupid = models.IntegerField()
    agemax = models.IntegerField()
    agemin = models.IntegerField()
    name = models.CharField(max_length=100)
    handicap = models.CharField(max_length = 500, null = True)

    def __str__(self):
        return self.name