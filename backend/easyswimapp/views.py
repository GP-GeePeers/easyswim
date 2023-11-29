from django.shortcuts import render
from django.http import HttpResponse
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
    return HttpResponse("Hello Word!-EasySwim")