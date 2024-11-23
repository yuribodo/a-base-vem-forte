from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Log
from .serializers import LogSerializer


class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LogRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
