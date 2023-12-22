from rest_framework import serializers
from .models import LXF

class LXFSerializer(serializers.ModelSerializer):
    class Meta:
        model = LXF
        fields = '__all__'