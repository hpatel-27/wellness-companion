from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

# Create your views here.


# Post request to the register
class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if User.objects.filter(username=username).exists():
            # User already exists with this username
            return Response(
                {"error": "Username taken."}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.create_user(username=username, password=password)
        return Response(
            {"message": "User created successfully!"}, status=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response(
                {"refresh": str(refresh), "access": str(refresh.access_token)}
            )
        return Response(
            {"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
        )
