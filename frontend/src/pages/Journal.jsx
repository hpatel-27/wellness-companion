import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import journalService from "../services/journalService";

const Journal = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [journal, setJournal] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    journalService.getJournal(auth, setAuth).then((data) => {
      setJournal(data);
      setNotes(data.notes);
    });
  });

  const printJournal = () => {
    console.log("Journal for user: ", journal);
    console.log("Notes from the journal: ", notes);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800 ml-5">
            {journal?.title || "My Journal"}
          </h1>
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
              className="h-7 w-7 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition flex items-center justify-center cursor-pointer"
              onClick={() => console.log("Button clicked to create note")}
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
                <div
                  key={note.id}
                  className="bg-gray-100 rounded-lg p-4 shadow-md hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => console.log("Open to view the specific note")}
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-800">
                    Last updated: <span>{formatDate(note.updated_at)}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {note.content}
                  </p>
                  <div className="flex justify-end space-x-3">
                    <p className="bg-blue-400 rounded-xl text-white p-2 text-xs italic mt-2">
                      <span className="">Sleep Score: </span>{" "}
                      {note?.sleep_score}
                    </p>
                    <p className="bg-blue-400 rounded-xl text-white p-2 text-xs italic mt-2">
                      {note?.mood}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No notes yet.</p>
            )}
          </div>
        </section>
      </div>
      <button
        className="flex justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
        onClick={printJournal}
      >
        Click me for data
      </button>
    </div>
  );
};

export default Journal;
