from rest_framework import serializers
from .models import LXF
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class LXFSerializer(serializers.ModelSerializer):
    class Meta:
        model = LXF
        fields = '__all__'
        



class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')