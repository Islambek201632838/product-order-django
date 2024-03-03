from rest_framework.serializers import ModelSerializer
from .models import Order, Product, ProductInOrder

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ProductInOrderSerializer(ModelSerializer):
    class Meta:
        model = ProductInOrder
        fields = '__all__'
    
    def validate(self, data):
        instance = self.instance  # Get the current instance being validated
        if instance:
            instance.clean()  # Manually call the clean method of the instance
        return data
