from django.test import TestCase
from rest_framework.exceptions import ValidationError
from products.serializers import ProductSerializer
from products.models import Products


class ProductSerializerTestCase(TestCase):
    fixtures = ["prototype_db.json"]

    def setUp(self):
        self.product = Products.objects.first()

    def test_serializer_create_valid_data(self):
        """Tests whether the serializer creates a product with valid data correctly"""
        product_data = {
            "name": "Product names",
            "description": "Product descriptions",
            "category": "MEATS",
            "price": "100.00",
            "expiration_date": "2024-12-27",
            "quantity": 10,
            "code_product": "TEST123",
            "destination": "TRASH",
            "is_perishable": True,
            "date_of_manufacture": "2024-09-24",
            "recycle": False,
            "discard": False,
            "total_recycled": 0,
            "total_discarded": 0,
        }
        serializer = ProductSerializer(data=product_data)
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(product.name, product_data["name"])
