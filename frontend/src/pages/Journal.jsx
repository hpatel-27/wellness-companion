import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import journalService from "../services/journalService";
import Note from "../components/Note";
import NoteModal from "../components/NoteModal";
import noteService from "../services/noteService";

const Journal = () => {
  // Auth context
  const { auth, setAuth } = useContext(AuthContext);
  // Journal and notes
  const [journal, setJournal] = useState(null);
  const [notes, setNotes] = useState([]);
  // Update title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(journal?.title);
  // modal pop up control
  const [showModal, setShowModal] = useState(false);

  // the selected note that has been clicked on by the user
  const [selectedNote, setSelectedNote] = useState(null);

  // Sort the list of notes based on when they were last updated
  const sortNotes = (notes) => {
    const sorted = notes.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
    return sorted;
  };

  // Set the journal and notes info on load
  // Also, set the editedTitle with the journal title
  useEffect(() => {
    journalService.getJournal(auth, setAuth).then((data) => {
      setJournal(data);

      const sortedNotes = sortNotes(data.notes);
      setNotes(sortedNotes);
      // this should be initialized once to separate it from journal.title
      // any changes to the title in edit, will be updated in the backend
      // and we have controlled input
      setEditedTitle(data.title);
    });
  }, [auth, setAuth]);

  // Update the journal with its new title
  const updateJournalTitle = async () => {
    try {
      // so now update the actual journal title in server
      const updatedJournal = await journalService.updateJournal(
        editedTitle.trim(),
        auth,
        setAuth
      );
      setJournal(updatedJournal);
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Failed to update journal: ", error);
    }
  };

  // when a modal is submitted for a new note, send a post request
  // to the backend and then get that note and add it to the current list
  const handleModalSave = async (noteData) => {
    try {
      if (selectedNote) {
        const updatedNote = await noteService.updateNote(
          auth,
          setAuth,
          noteData,
          selectedNote.id
        );
        setNotes((prev) => {
          const updated = prev.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          );

          return sortNotes(updated);
        });
      } else {
        const newNote = await noteService.createNote(auth, setAuth, noteData);
        setNotes((prevNotes) => sortNotes([...prevNotes, newNote]));
      }

      // On modal close, this should already be set to false
      // but it doesn't hurt to set it again.
      setShowModal(false);

      // After the note is saved after updating, there should not be
      // a selected note.
      setSelectedNote(false);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const printJournal = () => {
    console.log(journal);
    console.log(notes);
  };

  // When the button on the NoteModal is clicked to delete a Note,
  // this function runs. It makes a request to delete the existing
  // note, and needs the noteId.
  const handleNoteDelete = () => {};

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center bg-white rounded-2xl p-6 mb-8 text-gray-800">
          {isEditingTitle ? (
            <input
              className="text-4xl font-semibold bg-gray-100 border border-gray-100 rounded px-2 py-1 w-full max-w-lg"
              value={editedTitle}
              autoFocus
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={updateJournalTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") updateJournalTitle();
              }}
            />
          ) : (
            <h1 className="text-4xl font-semibold">{journal?.title}</h1>
          )}
          <button
            className="h-8 w-8 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition flex items-center justify-center cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </header>
        <section className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-700">All Notes</h2>
              <p className="text-sm text-gray-500 mt-1">
                Start writing or choose an existing note.
              </p>
            </div>

            <button
              className="h-8 w-8 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition flex items-center justify-center cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {notes?.length > 0 ? (
              notes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  handleClick={() => {
                    setSelectedNote(note);
                    setShowModal(true);
                    console.log(note);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No notes yet.</p>
            )}
          </div>
        </section>

        {showModal && (
          <NoteModal
            onClose={() => {
              setShowModal(false);
              setSelectedNote(false);
            }}
            onSave={handleModalSave}
            onDelete={handleNoteDelete}
            existingNote={selectedNote}
          />
        )}

        <button
          className="flex justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
          onClick={printJournal}
        >
          Click me for testing info
        </button>
      </div>
    </div>
  );
};

export default Journal;
