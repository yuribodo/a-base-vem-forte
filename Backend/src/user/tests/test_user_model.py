from django.test import TestCase
from user.models import User
from django.db import IntegrityError


class UserModelTests(TestCase):
    fixtures = ["prototype_db.json"]

    def test_create_user_with_valid_data(self):
        """Tests the creation of a user with valid data in the model"""
        user = User.objects.get(pk=1)
        self.assertEqual(user.email, "janedoe@example.com")
        self.assertEqual(user.document, "98765432100")
        self.assertEqual(user.document_type, "CPF")

    def test_user_document_unique_constraint(self):
        """Tests whether the User model prevents duplication of the document field"""
        user = User.objects.get(pk=1)
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                username="newuser",
                email="new.email@example.com",
                document=user.document,
                document_type="CPF",
                enterprise_segment="Retail",
            )
