from django.db import models
from category.models import Category
from destination.models import Destination


class Products(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, related_name="products"
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    expiration_date = models.DateField()
    days_left = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    code_product = models.CharField(max_length=50, unique=True)
    destination = models.ForeignKey(
        Destination,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
    )
    is_perishable = models.BooleanField(default=True)
    date_of_manufacture = models.DateField()
