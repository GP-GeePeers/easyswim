# Generated by Django 4.1.9 on 2024-01-30 00:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('easyswimapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='username',
            field=models.CharField(max_length=255, unique=True, default='default_username'),
            preserve_default=False,
        ),
]

