from rest_framework.generics import CreateAPIView
from .models import User
from .serializers import UserSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["Register"])
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
