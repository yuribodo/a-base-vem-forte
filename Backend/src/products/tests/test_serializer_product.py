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

    def test_serializer_create_invalid_dates(self):
        """Tests whether the serializer returns an error when trying
        to create a product with an expiration date before the manufacturing date
        """
        product_invalid_data = {
            "name": "Product Invalid",
            "description": "Test invalid date",
            "category": "MEATS",
            "price": 10.5,
            "expiration_date": "2023-12-31",
            "date_of_manufacture": "2024-01-01",
            "quantity": 10,
            "code_product": "TEST123",
            "destination": "TRASH",
        }
        serializer = ProductSerializer(data=product_invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn(
            "A data de validade não pode ser anterior à data de fabricação.",
            str(serializer.errors),
        )

    def test_serializer_update_invalid_recycle_discard(self):
        """Tests whether the serializer returns an error when trying to update a product
        to be recycled and discarded at the same time
        """
        data = {"recycle": True, "discard": True}
        serializer = ProductSerializer(instance=self.product, data=data, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn(
            "A product cannot be recycled and discarded at the same time.",
            str(serializer.errors),
        )

    def test_serializer_update_valid_data(self):
        """Tests whether the serializer correctly updates a product with valid data"""
        data = {"recycle": True}
        serializer = ProductSerializer(instance=self.product, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        update_product = serializer.save()
        self.assertTrue(update_product.recycle)

    def test_serializer_update_invalid_quantity_recycle(self):
        """Tests whether the serializer returns an error when trying to update a product
        to be recycled when the quantity is zero
        """
        self.product.quantity = 0
        self.product.save()
        data = {"recycle": True}
        serializer = ProductSerializer(instance=self.product, data=data, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn(
            "It is not possible to recycle or dispose of a product with zero quantity.",
            str(serializer.errors),
        )
