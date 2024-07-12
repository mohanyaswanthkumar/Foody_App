from django.db import models

class Person(models.Model):
    name=models.CharField(max_length=20)
    email=models.EmailField()
    password=models.CharField(max_length=16)
    
    def __str__(self):
        return self.name
class Cart(models.Model):
    username=models.CharField(max_length=30)
    productname=models.CharField(max_length=20)
    price=models.IntegerField()
    quantity = models.PositiveIntegerField()
    category=models.CharField(max_length=20)
    productimage=models.ImageField(default='header_img.png',upload_to='static/',blank=True, null=True)
    #image = models.ImageField(upload_to='static/', default='header_img.png')
    def __str__(self):
        return self.productname
    
class Order(models.Model):
    username=models.CharField(max_length=60)
    items=models.JSONField()
    amount=models.IntegerField()
    address=models.CharField(max_length=150)
    status=models.CharField(default="Food Processing",max_length=40)
    date=models.DateField(auto_now=True)
    payment=models.BooleanField(default=False)

    def __str__(self):
        return self.items

