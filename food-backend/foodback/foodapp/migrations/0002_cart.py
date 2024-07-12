# Generated by Django 5.0.4 on 2024-05-06 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30)),
                ('productname', models.CharField(max_length=20)),
                ('price', models.IntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('category', models.CharField(max_length=20)),
            ],
        ),
    ]
