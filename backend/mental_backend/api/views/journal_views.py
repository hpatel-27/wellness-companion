from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..models import Journal
from ..serializer import JournalSerializer


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

    put:
        Update the journal.

    delete:
        Delete a specific journal.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, journal_id):
        journal = _get_user_journal_or_404(journal_id, request.user)
        if not journal:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = JournalSerializer(journal)
        return Response(serializer.data)

    def put(self, request, journal_id):
        # Check if the user has a journal
        journal = _get_user_journal_or_404(journal_id, request.user)
        if not journal:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = JournalSerializer(journal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # Check if the user has a journal
        journal = Journal.objects.filter(owner=request.user).first()
        if not journal:
            return Response(
                {"error": "Journal not found."}, status=status.HTTP_404_NOT_FOUND
            )
        journal.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )


def _get_user_journal_or_404(journal_id, user):
    journal = Journal.objects.filter(id=journal_id, owner=user).first()
    if not journal:
        return None
    return journal
