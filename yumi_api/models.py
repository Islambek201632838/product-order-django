from django.db import models
from django.core.exceptions import ValidationError

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Order(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Аренда с {self.start_date} по {self.end_date}"

class ProductInOrder(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rental_price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена товара в рамках аренды
    duration = models.IntegerField()  # Продолжительность аренды в днях

    def __str__(self):
        return f"{self.product.name} в аренде под номером {self.order.id}"

    class Meta:
        unique_together = ('order', 'product')  # Уникальность товара в аренде

    def clean(self):
        # Проверка, что товар может быть включен в аренду только один раз
        existing_products = ProductInOrder.objects.filter(order=self.order)
        if self.pk:
            existing_products = existing_products.exclude(pk=self.pk)
        if existing_products.filter(product=self.product).exists():
            raise ValidationError("This product is already included in the order.")

        
        overlapping_orders = ProductInOrder.objects.filter(
            product=self.product,
            order__start_date__lte=self.order.end_date,
            order__end_date__gte=self.order.start_date
        )
        if self.pk:
            overlapping_orders = overlapping_orders.exclude(pk=self.pk)
        if overlapping_orders.exists():
            raise ValidationError("This product cannot be included in overlapping orders.")
