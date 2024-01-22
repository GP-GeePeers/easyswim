from django.shortcuts import render
from django.http import HttpResponse
from .serializers import LXFSerializer
from .models import LXF
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
"""
view.py
====================================
The core module of my example project
"""

# Create your views here.
def home (request):
    """
    This function handles the HTTP request and returns a greeting response.

    :param request: HttpRequest object1
    :return: HttpResponse object with a greeting message

    """
    return HttpResponse("Hello World!-EasySwim")

class LXFView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = LXF.objects.all()
        serializer = LXFSerializer(posts, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        lxf_serializer = LXFSerializer(data=request.data)
        if lxf_serializer.is_valid():
            lxf_serializer.save()
            return Response(lxf_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', lxf_serializer.errors)
            return Response(lxf_serializer.errors, status=status.HTTP_400_BAD_REQUEST)