# Generated by Django 4.1.9 on 2024-01-31 12:40
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Athlete_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('athleteid', models.IntegerField()),
                ('lastname', models.CharField(max_length=500)),
                ('firstname', models.CharField(max_length=500)),
                ('gender', models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], max_length=50, null=True)),
                ('license', models.IntegerField()),
                ('birthdate', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Club_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clubid', models.IntegerField()),
                ('name', models.CharField(max_length=500)),
                ('shortname', models.CharField(max_length=20)),
                ('code', models.CharField(max_length=20)),
                ('nation', models.CharField(max_length=20)),
                ('region', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Constructor_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('registration', models.CharField(max_length=100)),
                ('version', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Constructor_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('registration', models.CharField(max_length=100)),
                ('version', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Entry_Athlete_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventid', models.IntegerField()),
                ('entrytime', models.TimeField()),
                ('athlete', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.athlete_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Entry_Relay_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventid', models.IntegerField()),
                ('entrytime', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Event_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventid', models.IntegerField()),
                ('daytime', models.TimeField(null=True)),
                ('gender', models.CharField(choices=[('F', 'Female'), ('M', 'Male')], max_length=50, null=True)),
                ('number', models.IntegerField()),
                ('order', models.IntegerField()),
                ('round', models.CharField(max_length=50)),
                ('preveventid', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Event_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventid', models.IntegerField()),
                ('gender', models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], max_length=50, null=True)),
                ('number', models.IntegerField()),
                ('preveventid', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Meet_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bucket_path', models.CharField(max_length=500)),
                ('city', models.CharField(max_length=100)),
                ('is_active', models.IntegerField(default=0)),
                ('name', models.CharField(max_length=255)),
                ('course', models.CharField(max_length=50)),
                ('deadline', models.DateField()),
                ('number', models.IntegerField()),
                ('organizer', models.CharField(max_length=100)),
                ('organizer_url', models.URLField()),
                ('reservecount', models.IntegerField()),
                ('startmethod', models.IntegerField()),
                ('timing', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=50)),
                ('nation', models.CharField(max_length=50)),
                ('maxentriesathlete', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Meet_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=255)),
                ('course', models.CharField(max_length=50)),
                ('deadline', models.DateField()),
                ('number', models.IntegerField()),
                ('nation', models.CharField(max_length=50)),
                ('meet', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='SwimStyle_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance', models.IntegerField()),
                ('relay_count', models.IntegerField()),
                ('stroke', models.CharField(max_length=50)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.event_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='SwimStyle_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance', models.IntegerField()),
                ('relay_count', models.IntegerField()),
                ('stroke', models.CharField(max_length=50)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.event_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='Session_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('daytime', models.TimeField()),
                ('number', models.IntegerField()),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Session_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('daytime', models.TimeField()),
                ('name', models.CharField(max_length=100)),
                ('number', models.IntegerField()),
                ('warmupfrom', models.TimeField()),
                ('warmupuntil', models.TimeField()),
                ('maxentriesathlete', models.IntegerField(null=True)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='RelayPosition_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('athleteid', models.IntegerField()),
                ('entry', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.entry_relay_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Relay_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('relayid', models.IntegerField()),
                ('number', models.IntegerField()),
                ('agetotalmax', models.IntegerField()),
                ('agetotalmin', models.IntegerField()),
                ('agemin', models.IntegerField()),
                ('agemax', models.IntegerField()),
                ('gender', models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], max_length=50, null=True)),
                ('club', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.club_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Qualify_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from1', models.DateField()),
                ('until', models.DateField()),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Pool_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Pool_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('lane_max', models.IntegerField()),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='PointTable_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pointtableid', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('version', models.CharField(max_length=20)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='MeetInfo_RelayPosition_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.CharField(max_length=50)),
                ('qualificationtime', models.CharField(max_length=10)),
                ('relaypositon', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.relayposition_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='MeetInfo_Entry_Athlete_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.CharField(max_length=50)),
                ('date', models.DateField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('nation', models.CharField(blank=True, max_length=20, null=True)),
                ('name', models.CharField(blank=True, max_length=500, null=True)),
                ('entry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.entry_athlete_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='LXF',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100)),
                ('description', models.TextField(blank=True)),
                ('lxf_file', models.FileField(upload_to='lxf_files')),
                ('meet', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='Fee_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(max_length=3)),
                ('value', models.DecimalField(decimal_places=2, max_digits=6)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.event_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Fee_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency', models.CharField(max_length=3)),
                ('value', models.DecimalField(decimal_places=2, max_digits=6)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.event_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='Facility_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('nation', models.CharField(max_length=50)),
                ('street', models.CharField(max_length=100)),
                ('zip', models.CharField(max_length=20)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.AddField(
            model_name='event_teammanager',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.session_teammanager'),
        ),
        migrations.AddField(
            model_name='event_meetmanager',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.session_meetmanager'),
        ),
        migrations.AddField(
            model_name='entry_relay_teammanager',
            name='relay',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.relay_teammanager'),
        ),
        migrations.CreateModel(
            name='Contact_Meet_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=200)),
                ('zip', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='Contact_Constructor_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('zip', models.CharField(max_length=20)),
                ('country', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('internet', models.URLField()),
                ('construtor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.constructor_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='Contact_Constructor_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('street', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('zip', models.CharField(max_length=20)),
                ('country', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('internet', models.URLField()),
                ('construtor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.constructor_meetmanager')),
            ],
        ),
        migrations.AddField(
            model_name='club_teammanager',
            name='meet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_teammanager'),
        ),
        migrations.AddField(
            model_name='athlete_teammanager',
            name='club',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.club_teammanager'),
        ),
        migrations.CreateModel(
            name='AgeGroup_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agegroupid', models.IntegerField()),
                ('gender', models.CharField(blank=True, choices=[('F', 'Female'), ('M', 'Male')], max_length=50, null=True)),
                ('agemax', models.IntegerField()),
                ('agemin', models.IntegerField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.event_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='AgeGroup_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agegroupid', models.IntegerField()),
                ('agemax', models.IntegerField()),
                ('agemin', models.IntegerField()),
                ('name', models.CharField(max_length=100, null=True)),
                ('handicap', models.CharField(max_length=500, null=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.event_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='AgeDate_TeamManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DateField()),
                ('type', models.CharField(max_length=200)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_teammanager')),
            ],
        ),
        migrations.CreateModel(
            name='AgeDate_MeetManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DateField()),
                ('type', models.CharField(max_length=200)),
                ('meet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='easyswimapp.meet_meetmanager')),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(default='default_username', max_length=255, unique=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
