from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from user.serializers import UserSerializer
from django.core.exceptions import ValidationError


class UserSerializerTests(TestCase):
    def setUp(self):
        self.valid_user_data = {
            "first_name": "Lisa",
            "last_name": "Doe",
            "email": "lisa.doe@example.com",
            "document_type": "CPF",
            "document": "12345678909",
            "enterprise_segment": "Retail",
            "password": "password123",
            "phone_number": "1234567890",
        }

    def test_user_serializer_with_valid_data(self):
        """Tests whether the serializer validates and creates a user with valid data"""
        serializer = UserSerializer(data=self.valid_user_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, self.valid_user_data["email"])
        self.assertTrue(user.check_password(self.valid_user_data["password"]))
