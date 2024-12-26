from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
)
from .models import Products
from .serializers import ProductSerializer
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import status


@extend_schema(tags=["Products"])
class ProductListCreateView(ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


@extend_schema(tags=["Products"])
class ProductRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


class ProductRecycleOrDiscardUpdateView(UpdateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer

    def partial_update(self, request, *args, **kwargs):
        product = self.get_object()
        action = request.data.get("action")
        quantity = request.data.get("quantity", 0)

        try:
            quantity = int(quantity)
            if quantity <= 0:
                return Response(
                    {"error": "Quantity must be greater than zero"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if action in ("recycle", "discard"):
                if product.quantity < quantity:
                    return Response(
                        {"error": "Not enough products available for this action"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
        except ValueError:
            return Response(
                {"error": "Invalid quantity format. It must be an integer"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if action == "recycle":
            if product.quantity >= 0:
                product.recycle = True
                product.quantity -= quantity
                product.total_recycled += quantity
            else:
                return Response(
                    {"error": "Not enough products available for recycling"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        elif action == "discard":
            if product.quantity >= 0:
                product.discard = True
                product.quantity -= quantity
                product.total_discarded += quantity
            else:
                return Response(
                    {"error": "Not enough products available for disposal"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"error": "Invalid action. Use 'recycle' or 'discard'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product.save()
        serializer = self.get_serializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
