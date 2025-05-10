from django.db import models
from .journal import Journal


class Note(models.Model):
    """
    A Note is a single journal entry associated with a user's Journal.

    Each note includes:
    - A title (`note_title`)
    - The content of the note (`content`)
    - The mood of the user when writing the note (`mood`)
    - A sleep score indicating sleep quality for that day (`sleep_score`)
    - The timestamp when the note was created (`date_created`)
    - The timestamp when the note was last updated(`updated_at`)
    """

    journal = models.ForeignKey(Journal, on_delete=models.CASCADE, related_name="notes")
    note_title = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    mood = models.CharField(max_length=50, default="Neutral")
    sleep_score = models.DecimalField(
        max_digits=2, decimal_places=1, blank=True, null=True
    )

    def __str__(self):
        return self.note_title
