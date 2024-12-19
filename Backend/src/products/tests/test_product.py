from django.test import TestCase
from rest_framework import status
from django.urls import reverse
from products.models import Products


class ProductTestCase(TestCase):
    fixtures = ["prototype_db.json"]

    def setUp(self):
        self.product = Products.objects.get(pk=1)
        self.list_create_url = reverse("product-list-create")
        self.detail_url = reverse("product-detail", args=[self.product.id])
        self.update_url = reverse("product-recycle-or-discard", args=[self.product.id])

    def test_create_product(self):
        """Test creating a new product"""

        new_product_data = {
            "name": "New Product",
            "description": "Another product description",
            "category": "MEATS",
            "price": "15.50",
            "expiration_date": "2024-12-31",
            "quantity": 5,
            "code_product": "NP67890",
            "destination": "DONATION",
            "is_perishable": True,
            "date_of_manufacture": "2024-01-01",
            "recycle": False,
            "discard": False,
        }
        response = self.client.post(
            self.list_create_url, new_product_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Products.objects.count(), 3)

    def test_list_products(self):
        """Test listing all products"""
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_retrieve_products(self):
        """Test retrieving a specific product by ID"""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["id"], self.product.id)
