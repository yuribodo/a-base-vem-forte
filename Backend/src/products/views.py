from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Products
from .serializers import ProductSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["Products"])
class ProductListCreateView(ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


@extend_schema(tags=["Products"])
class ProductRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
