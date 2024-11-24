from rest_framework import generics
from .models import Products
from .serializers import ProductSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["Products"])
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


@extend_schema(tags=["Products"])
class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
