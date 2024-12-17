from django.test import TestCase
from user.serializers import UserSerializer
from user.models import User


class UserSerializerTests(TestCase):
    def setUp(self):
        self.valid_user_data = {
            "first_name": "Lisa",
            "last_name": "Weller",
            "username": "lisa_weller",
            "email": "lisa.weller@example.com",
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

    def test_user_serializer_duplicate_document(self):
        """Tests whether the serializer prevents document duplication"""
        User.objects.create_user(**self.valid_user_data)
        serializer = UserSerializer(data=self.valid_user_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("document", serializer.errors)

    def test_user_serializer_missing_field(self):
        """Tests whether the serializer returns an error when required fields are missing"""
        invalid_data = self.valid_user_data.copy()
        del invalid_data["email"]
        serializer = UserSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)
