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

    if action == "recycle" and not product.recycle:
        if product.quantity > 0:
            product.recycle = True
            product.quantity -= 1
            product.total_recycled += 1
        else:
            return Response(
                {"error": "There are no more products available for recycling."},
                status=status.HTTP_400_BAD_REQUEST,
            )
    elif action == "discard" and not product.discard:
        if product.quantity > 0:
            product.discard = True
            product.quantity -= 1
            product.total_discarded += 1
        else:
            return Response(
                {"error": "There are no more products available for disposal."},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:
        return Response(
            {"error": "Invalid action or status already updated."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    product.save()
    serializer = self.get_serializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)
