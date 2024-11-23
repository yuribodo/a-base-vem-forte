# Generated by Django 5.1.3 on 2024-11-23 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.CharField(choices=[('CEREALS', 'Cereals'), ('MEATS', 'Meats'), ('DAIRY PRODUCTS', 'Dairy products'), ('FRUITS', 'Fruits'), ('VEGETABLES', 'Vegetables'), ('DRINKS', 'Drinks'), ('SPICES', 'Spices'), ('FROZEN', 'Frozen'), ('CANNED GOODS', 'Canned goods')], max_length=15)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('expiration_date', models.DateField()),
                ('quantity', models.PositiveIntegerField()),
                ('code_product', models.CharField(max_length=50, unique=True)),
                ('destination', models.CharField(choices=[('SALE', 'Sale'), ('DONATION', 'donation'), ('TRASH', 'Trash')], max_length=8)),
                ('is_perishable', models.BooleanField(default=True)),
                ('date_of_manufacture', models.DateField()),
            ],
        ),
    ]
