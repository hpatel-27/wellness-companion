from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..models import Journal, Note
from ..serializer import NoteSerializer


# List all notes and create a Note within a Journal
class NoteListCreateView(APIView):
    """
    get:
        Get all the notes from the authenticated user's journal.

    post:
        Create a new note in the authenticated user's journal.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        journal = _get_user_journal_or_404(request.user)
        if not journal:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )
        notes = journal.notes.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        journal = _get_user_journal_or_404(request.user)
        if not journal:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )
        data = request.data.copy()
        data["journal"] = journal.id

        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List, update, and delete specific Note in a Journal
class NoteDetailView(APIView):
    """
    get:
        Get a specific note from the authenticated user's journal.

    put:
        Update a specific note in the authenticated user's journal.

    delete:
        Delete a specific note in the authenticated user's journal.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, note_id):
        note, error = _get_user_note_or_404(request.user, note_id)
        if error:
            return error

        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, note_id):
        note, error = _get_user_note_or_404(request.user, note_id)
        if error:
            return error

        serializer = NoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, note_id):
        note, error = _get_user_note_or_404(request.user, note_id)
        if error:
            return error

        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def _get_user_journal_or_404(user):
    journal = Journal.objects.filter(owner=user).first()
    if not journal:
        return None
    return journal


def _get_user_note_or_404(user, note_id):
    journal = _get_user_journal_or_404(user)
    if not journal:
        return None, Response(
            {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
        )

    try:
        note = journal.notes.get(id=note_id)
        return note, None
    except Note.DoesNotExist:
        return None, Response(
            {"error": "Note not found."}, status=status.HTTP_404_NOT_FOUND
        )
