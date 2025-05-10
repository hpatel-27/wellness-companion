from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Journal, Note
from .serializer import JournalSerializer, NoteSerializer


# Create your views here.


# Display and create journals
class JournalCreateView(APIView):
    """
    get:
        Return a list of all the existing Journals.

    post:
        Create a new user instance.
    """

    permission_classes = [IsAuthenticated]

    # Only for testing
    def get(self, request):
        journals = Journal.objects.all()
        serializer = JournalSerializer(journals, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Check if the user already has a journal
        if Journal.objects.filter(owner=request.user).exists():
            return Response(
                {"error": "You already have a journal."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        data = request.data.copy()
        data["owner"] = request.user.id
        serializer = JournalSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve, update, and delete specific journal
class JournalDetailView(APIView):
    """
    get:
        Get a specific journal.

    post:
        Create a new user instance.

    delete:
        Delete a specific journal.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, journal_id):
        try:
            journal = Journal.objects.get(id=journal_id, owner=request.user)
        except Journal.DoesNotExist:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = JournalSerializer(journal)
        return Response(serializer.data)

    def put(self, request, journal_id):
        try:
            journal = Journal.objects.get(id=journal_id)
        except Journal.DoesNotExist:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = JournalSerializer(journal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, journal_id):
        try:
            journal = Journal.objects.get(id=journal_id)
            journal.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Journal.DoesNotExist:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )


# List all notes and create a Note within a Journal
class NoteListCreateView(APIView):
    """
    get:
        Get all the notes from the journal

    post:
        Create a new note in the journal
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, journal_id):
        try:
            journal = Journal.objects.get(id=journal_id)
        except Journal.DoesNotExist:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )

        notes = journal.notes.all()  # type: ignore
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, journal_id):
        try:
            journal = Journal.objects.get(id=journal_id)
        except Journal.DoesNotExist:
            return Response(
                {"error": "Journal does not exist."}, status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()
        data["journal"] = journal_id

        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List, update, and delete specific Note in a Journal
class NoteDetailView(APIView):
    """
    get:
        Get a specific note from the journal

    put:
        Update a specific note to the journal

    delete:
        Delete a specific note in the journal
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, note_id, journal_id):
        try:
            journal: Journal = Journal.objects.get(id=journal_id)
            note = journal.notes.get(id=note_id)  # type: ignore
        except (Journal.DoesNotExist, Note.DoesNotExist):
            return Response(
                {"error": "Journal or Note does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, note_id, journal_id):
        try:
            journal: Journal = Journal.objects.get(id=journal_id)
            note = journal.notes.get(id=note_id)  # type: ignore
        except (Journal.DoesNotExist, Note.DoesNotExist):
            return Response(
                {"error": "Note or Journal not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, note_id, journal_id):
        try:
            journal: Journal = Journal.objects.get(id=journal_id)
            note = journal.notes.get(id=note_id)  # type: ignore
            note.delete()
        except (Journal.DoesNotExist, Note.DoesNotExist):
            return Response(
                {"error": "Journal or Note not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )
