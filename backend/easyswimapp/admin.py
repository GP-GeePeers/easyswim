from django.contrib import admin
from .models import LXF, Constructor_MeetManager, Contact_Meet_MeetManager,\
Contact_Constructor_MeetManager, Meet_MeetManager, Pool_MeetManager, Facility_MeetManager,\
PointTable_MeetManager, Session_MeetManager, Event_MeetManager, SwimStyle_MeetManager, Fee_MeetManager, \
AgeGroup_MeetManager,AgeDate_MeetManager, Constructor_TeamManager, Contact_Constructor_TeamManager, Meet_TeamManager, \
Qualify_TeamManager, Pool_TeamManager, AgeDate_TeamManager, Session_TeamManager, Event_TeamManager, SwimStyle_TeamManager, \
Fee_TeamManager, AgeGroup_TeamManager, Club_TeamManager, Athlete_TeamManager, Entry_Athlete_TeamManager, \
MeetInfo_Entry_Athlete_TeamManager, Relay_TeamManager, Entry_Relay_TeamManager, RelayPosition_TeamManager, \
MeetInfo_RelayPosition_TeamManager, UserAccount

# Register your models here.

admin.site.register(LXF)

admin.site.register(UserAccount)
admin.site.register(Meet_MeetManager)
admin.site.register(Event_MeetManager)
admin.site.register(Constructor_MeetManager)
admin.site.register(Contact_Constructor_MeetManager)
admin.site.register(Contact_Meet_MeetManager)
admin.site.register(Pool_MeetManager)
admin.site.register(Facility_MeetManager)
admin.site.register(PointTable_MeetManager)
admin.site.register(Session_MeetManager)
admin.site.register(SwimStyle_MeetManager)
admin.site.register(AgeGroup_MeetManager)
admin.site.register(Fee_MeetManager)
admin.site.register(AgeDate_MeetManager)
##### Team Manager ####
admin.site.register(Constructor_TeamManager)
admin.site.register(Contact_Constructor_TeamManager)
admin.site.register(Meet_TeamManager)
admin.site.register(Qualify_TeamManager)
admin.site.register(Pool_TeamManager)
admin.site.register(AgeDate_TeamManager)
admin.site.register(Session_TeamManager)
admin.site.register(Event_TeamManager)
admin.site.register(SwimStyle_TeamManager)
admin.site.register(Fee_TeamManager)
admin.site.register(AgeGroup_TeamManager)
admin.site.register(Club_TeamManager)
admin.site.register(Athlete_TeamManager)
admin.site.register(Entry_Athlete_TeamManager)
admin.site.register(MeetInfo_Entry_Athlete_TeamManager)
admin.site.register(Relay_TeamManager)
admin.site.register(Entry_Relay_TeamManager)
admin.site.register(RelayPosition_TeamManager)
admin.site.register(MeetInfo_RelayPosition_TeamManager)
