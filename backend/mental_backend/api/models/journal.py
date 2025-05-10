from django.db import models
from django.contrib.auth.models import User


class Journal(models.Model):
    """
    A Journal is a personal collection of notes belonging to a single user.

    Each journal has:
    - A title (`title`)
    - An associated owner (`owner`) — one journal per user is enforced
    - The date it was created (`date_created`)
    - A timestamp for the last update (`updated_at`)
    - An optional cover image (`cover_image`)
    - An optional theme color (`theme_color`)
    """

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["owner"], name="unique_journal_per_user")
        ]

    title = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="journals")
    date_created = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # cover_image = models.ImageField(upload_to="journal_covers/", blank=True, null=True)
    theme_color = models.CharField(
        max_length=20, blank=True, help_text="Hex code or color name"
    )

    def __str__(self):
        return self.title
