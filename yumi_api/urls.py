from django.urls import path
from .views import OrderAPIView, ProductAPIView, ProductInOrderAPIView




urlpatterns = [
    path('orders/', OrderAPIView.as_view(), name = 'orders'),
    path('products/', ProductAPIView.as_view(), name = 'products'),
    path ('productInOrder/', ProductInOrderAPIView.as_view(), name = 'orderInProduct')
]