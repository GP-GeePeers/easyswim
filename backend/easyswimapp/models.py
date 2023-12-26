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