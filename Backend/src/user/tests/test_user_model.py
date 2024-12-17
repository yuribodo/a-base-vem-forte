from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from user.models import User
from user.serializers import UserSerializer
from django.core.exceptions import ValidationError


class UserModelTests(TestCase):
    fixtures = ["prototype_db.json"]

    def test_create_user_with_valid_data(self):
        """Tests the creation of a user with valid data in the model"""
        user = User.objects.get(pk=1)
        self.assertEqual(user.email, "janedoe@example.com")
        self.assertEqual(user.document, "98765432100")
        self.assertEqual(user.document_type, "CPF")
