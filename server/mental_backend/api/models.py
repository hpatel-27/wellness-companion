from django.db import models
from django.contrib.auth.models import User


class Journal(models.Model):
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="journals")
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Note(models.Model):
    journal = models.ForeignKey(Journal, on_delete=models.CASCADE, related_name="notes")
    note_title = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now=True)
    content = models.TextField()

    def __str__(self):
        return self.note_title
