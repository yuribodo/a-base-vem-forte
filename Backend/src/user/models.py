from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.crypto import get_random_string


class User(AbstractUser):
    CPF_CNPJ_CHOICES = [("CPF", "CPF"), ("CNPJ", "CNPJ")]
    groups = models.ManyToManyField(Group, related_name="custom_user_set", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_permissions", blank=True
    )
    document = models.CharField(max_length=18, unique=True)
    document_type = models.CharField(max_length=4, choices=CPF_CNPJ_CHOICES)
    enterprise_segment = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = get_random_string(8)
        super().save(*args, **kwargs)
