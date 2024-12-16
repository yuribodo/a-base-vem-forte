from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Log
from .serializers import LogSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["Log"])
class LogListCreateView(ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema(tags=["Log"])
class LogRetrieveDestroyView(RetrieveDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer
