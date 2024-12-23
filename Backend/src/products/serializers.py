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
            "recycle",
            "discard",
            "total_recycled",
            "total_discarded",
        ]
        read_only_fields = ["id", "total_recycled", "total_discarded"]

    def validate(self, data):

        expiration_date = data.get("expiration_date", None)
        date_of_manufacture = data.get("date_of_manufacture", None)

        if expiration_date and date_of_manufacture:
            if expiration_date < date_of_manufacture:
                raise serializers.ValidationError(
                    "A data de validade não pode ser anterior à data de fabricação."
                )

        recycle = data.get("recycle", False)
        discard = data.get("discard", False)
        quantity = data.get("quantity", self.instance.quantity if self.instance else 0)

        if recycle and discard:
            raise serializers.ValidationError(
                "A product cannot be recycled and discarded at the same time."
            )

        if (recycle or discard) and quantity <= 0:
            raise serializers.ValidationError(
                "It is not possible to recycle or dispose of a product with zero quantity."
            )

        return data

    def create(self, validated_data):
        return Products.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance
