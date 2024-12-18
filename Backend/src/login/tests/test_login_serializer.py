from django.test import TestCase
from django.contrib.auth import get_user_model
from login.serializers import LoginUserSerializer


User = get_user_model()


class LoginSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@mail.com", password="12345678", username="testuser"
        )

    def test_serializer_valid_data(self):
        """Tests serialization with valid data"""
        data = {
            "id": self.user.id,
            "email": self.user.email,
            "password": "12345678",
        }
        serializer = LoginUserSerializer(instance=self.user)
        serialized_data = serializer.data
        self.assertIn("id", serialized_data)
        self.assertIn("email", serialized_data)
        self.assertNotIn("password", serialized_data)
