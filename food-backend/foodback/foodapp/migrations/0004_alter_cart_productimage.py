# Generated by Django 5.0.4 on 2024-05-06 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0003_cart_productimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='productimage',
            field=models.ImageField(default='header_img.png', upload_to=''),
        ),
    ]
