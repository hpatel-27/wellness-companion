from django.urls import path
from .views import (
    JournalDetailView,
    JournalCreateView,
    NoteDetailView,
    NoteListCreateView,
)

urlpatterns = [
    # Journals
    path("journal/", JournalCreateView.as_view(), name="journal-list-create"),
    path("journal/me/", JournalDetailView.as_view(), name="journal-detail"),
    # Notes (nested within a journal)
    path(
        "journal/me/notes/",
        NoteListCreateView.as_view(),
        name="notes-list-create",
    ),
    path(
        "journal/me/notes/<int:note_id>/",
        NoteDetailView.as_view(),
        name="note-detail",
    ),
]
