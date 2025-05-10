from django.db import models
from .journal import Journal


class Note(models.Model):
    """
    Note object is associated with a journal. It has a title for the note,
    the date it was created, and the content within the note.
    """

    journal = models.ForeignKey(Journal, on_delete=models.CASCADE, related_name="notes")
    note_title = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now=True)
    content = models.TextField()

    def __str__(self):
        return self.note_title
