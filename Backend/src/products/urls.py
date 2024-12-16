from django.urls import path
from .views import (
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
    ProductRecycleOrDiscardUpdateView,
)

urlpatterns = [
    path("products/", ProductListCreateView.as_view(), name="product-list-create"),
    path(
        "products/<int:pk>/",
        ProductRetrieveUpdateDestroyView.as_view(),
        name="product-detail",
    ),
    path(
        "products/<int:pk>/status/",
        ProductRecycleOrDiscardUpdateView.as_view(),
        name="product-recycle-or-discard",
    ),
]
