from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from user.models import User


class LoginView(CreateAPIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            raise AuthenticationFailed("Email e senha são obrigatórios.")

        user = authenticate(request, username=email, password=password)
        if not user:
            raise AuthenticationFailed("Credenciais inválidas.")

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "email": user.email,
                "token": str(refresh.access_token),
            }
        )
