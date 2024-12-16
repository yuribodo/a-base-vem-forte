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
        ]
        read_only_fields = ["id"]

    def create(self, validated_data):

        expiration_date = validated_data.get("expiration_date", None)
        date_of_manufacture = validated_data.get("date_of_manufacture", None)

        if expiration_date and date_of_manufacture:
            if expiration_date < date_of_manufacture:
                raise serializers.ValidationError(
                    "A data de validade não pode ser anterior à data de fabricação."
                )

        return Products.objects.create(**validated_data)

    def update(self, instance, validated_data):
        recycle = validated_data.get("recycle", instance.recycle)
        discard = validated_data.get("discard", instance.discard)

        if recycle and discard:
            raise serializers.ValidationError(
                "A product cannot be recycled and discarded at the same time."
            )

        if recycle or discard:
            if instance.quantity <= 0:
                raise serializers.ValidationError(
                    "It is not possible to recycle or dispose of a product with zero quantity."
                )
            instance.quantity -= 1

            instance.recycle = recycle
            instance.discard = discard

            return super().update(instance, validated_data)
