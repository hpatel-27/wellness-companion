from django.db import models
from django.contrib.auth.models import User


class Journal(models.Model):
    """
    Journal object that contains all the notes made by a user. The Journal
    has a title, owner, and the date it was created.
    """

    title = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="journals")
    date_created = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
