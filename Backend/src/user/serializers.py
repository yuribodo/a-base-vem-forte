from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "document_type",
            "document",
            "enterprise_segment",
            "password",
            "phone_number",
            "groups",
            "user_permissions",
        ]
        extra_kwargs = {
            "groups": {"required": False},
            "user_permissions": {"required": False},
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def validate_document(self, value):

        if self.instance:
            if (
                User.objects.exclude(id=self.instance.id)
                .filter(document=value)
                .exists()
            ):
                raise serializers.ValidationError("Este documento já está em uso.")
        else:
            if User.objects.filter(document=value).exists():
                raise serializers.ValidationError("Este documento já está em uso.")
        return value
