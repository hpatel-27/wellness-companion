from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

# Post request to the register 
class RegisterView(APIView):
    def post(self, request):
        pass


class LoginView(APIView):
    def post(self, request):
        pass
