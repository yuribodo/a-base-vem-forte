from rest_framework import serializers
from .models import Destination


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ["id", "name", "description"]
        read_only_fields = ["id"]
