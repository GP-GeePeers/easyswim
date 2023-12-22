from django.db import models

# Superuser:
# Username: admin
# Email: admin@email.com
# Password: admin
       
# Create your models here.
class Competition(models.Model):
    """
    This class represents a competition.
    This are example parameters, we need to change this to the ones in the files.
    """
    name = models.CharField(max_length=50)
    date = models.DateField()
    place = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    def __str__(self):
        return self.name

class LXF(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    lxf_file = models.FileField(upload_to='lxf_files')

    def __str__(self):
        return self.title
