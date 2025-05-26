import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import journalService from "../services/journalService";
import { AuthContext } from "../contexts/AuthContext";
import { formatDate } from "../util/formatDate";
const MAX_RECENT_NOTES = 4;

const Home = () => {
  // Don't use journal currently but could be useful
  // const [journal, setJournal] = useState(null);

  // Up to four most recent notes in widget
  const [recentNotes, setRecentNotes] = useState([]);

  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    journalService.getJournal(auth, setAuth).then((data) => {
      // setJournal(data);

      // Sort the notes to get the most recent at the front
      const notes = sortNotes(data?.notes);
      // Take the first five notes to be the recent notes
      setRecentNotes(notes.slice(0, MAX_RECENT_NOTES));
      console.log(notes.slice(0, 5));
    });
  }, [auth, setAuth]);

  // Sort the list of notes based on when they were last updated
  const sortNotes = (notes) => {
    const sorted = notes.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
    return sorted;
  };

  const handleRedirectRecentNotes = () => {
    navigate("/journal");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-3xl mx-auto pt-15">
        <header className="pb-4 mb-4 sm:mb-5 border-b">
          <h1 className="font-semibold text-4xl">Dashboard</h1>
        </header>
        {/* Have widgets for quick access */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
          {/* Recent Notes widget */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-medium">Recent Notes</h2>
              <button
                className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                onClick={handleRedirectRecentNotes}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
            <div className="flex space-x-6 overflow-x-auto">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="min-w-[200px] max-w-[200px] p-4 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                  onClick={handleRedirectRecentNotes}
                >
                  <h3 className="text-lg font-medium truncate">{note.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-4">
                    {note.content}
                  </p>
                  <p className="text-sm text-gray-900 mt-2">
                    Last updated: {formatDate(note.updated_at)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
