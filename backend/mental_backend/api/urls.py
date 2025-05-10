from django.urls import path
from .views import (
    JournalDetailView,
    JournalListCreateView,
    NoteDetailView,
    NoteListCreateView,
)

urlpatterns = [
    # Journals
    path("journal/", JournalListCreateView.as_view(), name="journal-list-create"),
    path(
        "journal/<int:journal_id>/", JournalDetailView.as_view(), name="journal-detail"
    ),
    # Notes (nested within a journal)
    path(
        "journal/<int:journal_id>/notes/",
        NoteListCreateView.as_view(),
        name="notes-list-create",
    ),
    path(
        "journal/<int:journal_id>/notes/<int:note_id>/",
        NoteDetailView.as_view(),
        name="note-detail",
    ),
]
