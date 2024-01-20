from django.contrib import admin
from .models import LXF, Constructor, Contact_Meet,Contact_Constructor, Meet, Pool, Facility, PointTable, Session, Event, SwimStyle, Fee, AgeGroup,AgeDate

# Register your models here.

admin.site.register(LXF)
admin.site.register(Meet)
admin.site.register(Event)
admin.site.register(Constructor)
admin.site.register(Contact_Constructor)
admin.site.register(Contact_Meet)
admin.site.register(Pool)
admin.site.register(Facility)
admin.site.register(PointTable)
admin.site.register(Session)
admin.site.register(SwimStyle)
admin.site.register(AgeGroup)
admin.site.register(Fee)
admin.site.register(AgeDate)