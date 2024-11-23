from rest_framework import serializers
from .models import Products


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
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

    def create(self, data):

        expiration_date = data.get("expiration_date", None)
        date_of_manufacture = data.get("date_of_manufacture", None)

        if expiration_date and date_of_manufacture:
            if expiration_date < date_of_manufacture:
                raise serializers.ValidationError(
                    "A data de validade não pode ser anterior à data de fabricação."
                )

        return data
