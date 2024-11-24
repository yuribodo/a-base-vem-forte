from django.urls import path
from .views import LoginView
from rest_framework_simplejwt.views import TokenRefreshView
from drf_spectacular.utils import extend_schema, extend_schema_view

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path(
        "token/refresh/",
        extend_schema_view(post=extend_schema(tags=["Login"]))(
            TokenRefreshView.as_view()
        ),
        name="token_refresh",
    ),
]
