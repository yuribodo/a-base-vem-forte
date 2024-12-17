from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from user.models import User
from django.urls import reverse


class UserRegisterTests(TestCase):
    fixtures = ["prototype_db.json"]

    def setUp(self):
        self.client = APIClient()
        self.url = reverse("register")

        self.valid_user_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "document_type": "CPF",
            "document": "12345678909",
            "enterprise_segment": "Retail",
            "password": "password123",
            "phone_number": "1234567890",
        }

    def test_register_user_success(self):
        """Tests whether a user can be registered with valid data"""
        response = self.client.post(self.url, self.valid_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            User.objects.filter(email=self.valid_user_data["email"]).exists()
        )

    def test_register_user_duplicate_email(self):
        """Tests whether the API returns an error when trying to register a user with a duplicate email address"""
        self.valid_user_data["email"] = User.objects.first().email
        response = self.client.post(self.url, self.valid_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_user_duplicate_document(self):
        """Tests whether the API returns an error when trying to register a user with a duplicate document"""
        self.valid_user_data["document"] = User.objects.first().document
        response = self.client.post(self.url, self.valid_user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("document", response.data)

    def test_register_user_missing_fields(self):
        """Tests whether the API returns an error when trying to register a user with missing fields"""
        incomplete_data = self.valid_user_data.copy()
        del incomplete_data["email"]
        response = self.client.post(self.url, incomplete_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
