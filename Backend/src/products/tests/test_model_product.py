from django.test import TestCase
from django.core.exceptions import ValidationError
from django.utils.dateparse import parse_date
from products.models import Products


class ProductsModelTestCase(TestCase):
    fixtures = ["prototype_db.json"]

    def setUp(self):
        self.product_data = {
            "name": "Product names",
            "description": "Product descriptions",
            "category": "MEATS",
            "price": "100.00",
            "expiration_date": parse_date("2024-12-27"),
            "quantity": 10,
            "code_product": "TEST123",
            "destination": "TRASH",
            "is_perishable": True,
            "date_of_manufacture": parse_date("2024-09-24"),
            "recycle": False,
            "discard": False,
            "total_recycled": 0,
            "total_discarded": 0,
        }

    def test_create_product(self):
        """Test creating a valid product with the provided data"""
        product = Products.objects.create(**self.product_data)
        self.assertIsInstance(product, Products)
        self.assertEqual(product.name, "Product names")
        self.assertEqual(product.category, "MEATS")

    def test_category_choices_validation(self):
        """Test that invalid category values raise a ValidationError"""
        self.product_data["category"] = "INVALID"
        with self.assertRaises(ValidationError):
            product = Products(**self.product_data)
            product.full_clean()

    def test_destination_choices_validation(self):
        """test tha invalid destination values raise ValidationError"""
        self.product_data["destination"] = "INVALID"
        with self.assertRaises(ValidationError):
            product = Products(**self.product_data)
            product.full_clean()

    def test_destination_choices_validation(self):
        """Test that code_product field enforces uniqueness"""
        Products.objects.create(**self.product_data)
        with self.assertRaises(Exception):
            Products.objects.create(**self.product_data)

    def test_recycled_and_discarded_flags(self):
        """Test the functionality of recycle and discard flags and their counts"""
        product = Products.objects.create(**self.product_data)
        product.recycle = True
        product.discard = True
        product.total_recycled = 5
        product.total_discarded = 10
        product.save()

        self.assertTrue(product.recycle)
        self.assertTrue(product.discard)
        self.assertEqual(product.total_recycled, 5)
        self.assertEqual(product.total_discarded, 10)
