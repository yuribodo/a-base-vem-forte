from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse


User = get_user_model()


class LoginTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="testuser@mail.com", password="12345678", username="testuser"
        )

        self.login_url = reverse("login")
        self.refresh_url = reverse("token_refresh")

    def test_login_successful(self):
        """Test successful login"""
        data = {
            "email": self.user.email,
            "password": "12345678",
        }
        response = self.client.post(self.login_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("email", response.data)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["email"], self.user.email)
