from django.db import models


class Products(models.Model):

    DESTINATION_CHOICES = [
        ("SALE", "Sale"),
        ("DONATION", "donation"),
        ("TRASH", "Trash"),
    ]
    CATEGORY_CHOICES = [
        ("CEREALS", "Cereals"),
        ("MEATS", "Meats"),
        ("DAIRY PRODUCTS", "Dairy products"),
        ("FRUITS", "Fruits"),
        ("VEGETABLES", "Vegetables"),
        ("DRINKS", "Drinks"),
        ("SPICES", "Spices"),
        ("FROZEN", "Frozen"),
        ("CANNED GOODS", "Canned goods"),
    ]
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=15, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    expiration_date = models.DateField()
    quantity = models.PositiveIntegerField()
    code_product = models.CharField(max_length=50, unique=True)
    destination = models.CharField(max_length=8, choices=DESTINATION_CHOICES)
    is_perishable = models.BooleanField(default=True)
    date_of_manufacture = models.DateField()
