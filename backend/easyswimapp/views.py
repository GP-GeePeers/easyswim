from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.views import View
from backend.easyswimapp import logout

from backend.easyswimapp.models import Competition
"""
view.py
====================================
The core module of my example project
"""

# Create your views here.
class DashboardView(View):
    def home (self, request):
        """
        This function handles the HTTP request and returns a greeting response.

        :param request: HttpRequest object1
        :return: HttpResponse object with a greeting message

        """
        return HttpResponse("Hello Word!-EasySwim")

    def listCompetitions(self, request):
        """
        This function handles the HTTP request and returns a list of competitions.

        :param request: HttpRequest object
        :return: HttpResponse object with a list of competitions

        """
        # TODO: Add missing db connection

        list_comp = Competition.objects.all()
        return HttpResponse("List of competitions")
    
def logout_view(request):
    logout(request)
    return redirect('login')