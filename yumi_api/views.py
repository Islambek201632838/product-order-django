
from rest_framework.generics import ListCreateAPIView
from rest_framework.pagination import LimitOffsetPagination

from .models import Order, ProductInOrder, Product
from .serializers import OrderSerializer, ProductInOrderSerializer, ProductSerializer

    
class OrderAPIView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    pagination_class = LimitOffsetPagination 

class ProductAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
        
class ProductInOrderAPIView(ListCreateAPIView):
    queryset = ProductInOrder.objects.all()
    serializer_class = ProductInOrderSerializer
    pagination_class = LimitOffsetPagination
