from django.urls import path
from .views import LogListCreateView, LogRetrieveDestroyView

urlpatterns = [
    path("logs/", LogListCreateView.as_view(), name="log-list-create"),
    path("logs/<int:pk>/", LogRetrieveDestroyView.as_view(), name="log-detail"),
]
