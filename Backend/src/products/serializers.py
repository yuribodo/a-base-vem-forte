from rest_framework import serializers
from .models import Products
from datetime import datetime


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        models = Products
        fields = [
            "id",
            "name",
            "description",
            "category",
            "price",
            "expiration_date",
            "quantity",
            "code_product",
            "destination",
            "is_perishable",
            "date_of_manufacture",
        ]
        read_only_fields = ["id"]

    def validate(self, data):
        if data["expiration_date"] < data["date_of_manufacture"]:
            raise serializers.ValidationError(
                "The expiration date cannot be earlier than the manufacturing date."
            )
        return data
