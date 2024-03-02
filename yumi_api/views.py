from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from requests import Response
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from .models import Order, ProductInOrder, Product
from .serializers import OrderSerializer, ProductInOrderSerializer, ProductSerializer

class ProductAPIView(ListCreateAPIView): #here

    def create(self, request):
        serializer  = ProductSerializer(data = request.data) #here
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        limit = self.request.query_params.get('limit', 10)
        offset = self.request.query_params.get('offset', 0)

        paginator = LimitOffsetPagination()
        paginator.default_limit = limit
        paginator.default_offset = offset

        product = Product.objects.all() #here
        result_page = paginator.paginate_queryset(product, self.request) #here
        serializer = ProductSerializer(result_page, many = True) #here

        return paginator.get_paginated_response(serializer.data)
    

class OrderAPIView(ListCreateAPIView): #here

    def create(self, request):
        serializer  = OrderSerializer(data = request.data) #here
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        limit = self.request.query_params.get('limit', 10)
        offset = self.request.query_params.get('offset', 0)

        paginator = LimitOffsetPagination()
        paginator.default_limit = limit
        paginator.default_offset = offset

        order = Order.objects.all() #here
        result_page = paginator.paginate_queryset(order, self.request) #here
        serializer = ProductSerializer(result_page, many = True) #here

        return paginator.get_paginated_response(serializer.data)
    

class ProductInOrderAPIView(ListCreateAPIView): #here

    def create(self, request):
        serializer  = ProductInOrderSerializer(data = request.data) #here
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        limit = self.request.query_params.get('limit', 10)
        offset = self.request.query_params.get('offset', 0)

        paginator = LimitOffsetPagination()
        paginator.default_limit = limit
        paginator.default_offset = offset

        productInOrder = ProductInOrder.objects.all() #here
        result_page = paginator.paginate_queryset(productInOrder, self.request) #here
        serializer = ProductInOrderSerializer(result_page, many = True) #here

        return paginator.get_paginated_response(serializer.data)
    
