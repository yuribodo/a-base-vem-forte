from django.db import models
from user.models import User
from products.models import Products


class Log(models.Model):
    ACTION_CHOICE = [
        ("UPDATE_QUANTITY", "Update the quantity"),
        ("UPDATE_PRICE", "Update the price"),
    ]
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="logs"
    )
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name="logs")
    action = models.CharField(max_length=50, choices=ACTION_CHOICE)
    timestamp = models.DateTimeField(auto_now_add=True)
