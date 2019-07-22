#/python3 encode=utf8
# Create your models here.
from .database import db
from sqlalchemy import Column, Date, DateTime, TIMESTAMP, Integer, String, text, PickleType, Text

Base = db.Model
metadata = Base.metadata


class KindeeAuthRecord(Base):
    __tablename__ = "kingdee_auth_record"

    id = Column(Integer, primary_key=True)
    sourceid = Column(String(32))
    idcard = Column(String(18))
    username = Column(String(20))
    guid = Column(String(32))
    result = Column(Integer)
    reqip = Column(String(16))
    create_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))


# class WXUser(models.Model):
#     id = models.IntegerField(primary_key=True)
#     first_name = models.CharField(max_length=255)
#     last_name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     active = models.BooleanField()
#     phone = models.CharField(max_length=16)
#     access_token = models.CharField(max_length=255)
#     openid = models.CharField(max_length=64)
#     refresh_token = models.CharField(max_length=255)
#     expire_time = models.DateTimeField()
#
#     def __unicode__(self):
#         return self.openid
