# Generated by Django 4.1.5 on 2023-01-25 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('custom_auth', '0002_rename_user_user_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Logins',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login_date', models.DateField()),
                ('no_of_logins', models.CharField(max_length=200)),
            ],
        ),
    ]
