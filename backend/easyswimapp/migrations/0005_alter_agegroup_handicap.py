# Generated by Django 4.1.9 on 2024-01-20 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('easyswimapp', '0004_alter_agegroup_handicap'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agegroup',
            name='handicap',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
