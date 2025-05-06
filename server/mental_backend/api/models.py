from django.db import models

class Note(models.Model):
    note_title = models.CharField(max_length=50)
    date_created = models.DateField()


    