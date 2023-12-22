from django.db import models

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