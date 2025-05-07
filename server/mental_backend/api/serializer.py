from rest_framework import serializers
from .models import Journal, Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class JournalSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    class Meta:
        model = Journal
        fields = ["id", "title", "owner", "date_created", "notes"]
