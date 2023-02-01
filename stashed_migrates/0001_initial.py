# Generated by Django 4.1.5 on 2023-01-24 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Yoga',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('studio_logo', models.CharField(max_length=30)),
                ('class_date', models.DateField()),
                ('class_name', models.CharField(max_length=50)),
                ('class_hour', models.CharField(max_length=20)),
                ('class_teacher', models.CharField(max_length=50)),
                ('studio_address', models.CharField(max_length=120)),
                ('phone_number', models.CharField(max_length=20)),
                ('url', models.CharField(max_length=200)),
            ],
        ),
    ]
