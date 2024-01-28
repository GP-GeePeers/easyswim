from rest_framework import serializers
from .models import LXF

class LXFSerializer(serializers.ModelSerializer):
    """
    Serializer for the lxf files.
    
    This serializer is used to convert LXF model instances into JSON representation and vice versa.
    It specifies the fields that should be included in the serialized output.
    """
    class Meta:
        model = LXF
        fields = '__all__'