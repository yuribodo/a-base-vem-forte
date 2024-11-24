from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Log
from .serializers import LogSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["Log"])
class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema(tags=["Log"])
class LogRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
