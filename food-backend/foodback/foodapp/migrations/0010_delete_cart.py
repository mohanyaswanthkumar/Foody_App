# Generated by Django 5.0.4 on 2024-05-09 05:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0009_remove_cart_image_cart_productimage'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Cart',
        ),
    ]
