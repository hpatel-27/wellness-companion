import { useState } from "react";

const NoteModal = ({ onClose, onSave, onDelete, existingNote = null }) => {
  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");
  const [mood, setMood] = useState(existingNote?.mood || "");
  const [sleepScore, setSleepScore] = useState(existingNote?.sleep_score || "");
  const [tag, setTag] = useState(existingNote?.tag || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if there is no title or input just stop the submission and make them do it again
    // Though, the form should prevent this from occurring, since they are required
    if (!title || !content) return;

    // Trim any whitespace off the ends of the title
    setTitle(title.trim());

    // Note data should at least send the title and content
    // the other fields are optional
    const noteData = {
      title,
      content,
    };

    // Only add the optional fields if they are not empty strings
    if (mood.trim() !== "") {
      noteData.mood = mood.trim();
    }

    if (sleepScore.trim() !== "") {
      // Validate the score as being in range 0-10.0
      const score = parseFloat(sleepScore.trim());
      if (score > 0 && score < 10.0) {
        // Sleep score is tracked as a string, so we should parse it to a float
        // It should be a number, since its input field is type=number
        noteData.sleep_score = parseFloat(sleepScore);
      }
    }

    if (tag.trim() !== "") {
      noteData.tag = tag.trim();
    }

    // Use the save function passed through props to handle the API
    // request and updates to the notes list
    onSave(noteData);

    // close/hide the modal
    onClose();
  };

  return (
    <div className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/20 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-2xl shadow-2xl sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              {existingNote ? "Edit Note" : "Add Note"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent transition hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Note Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="mood"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mood
                </label>
                <input
                  type="text"
                  name="mood"
                  id="mood"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  placeholder="Current Mood (Optional)"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="sleep-score"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Sleep Score
                </label>
                <input
                  type="number"
                  name="sleep-score"
                  id="sleep-score"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="0-10.0 (Optional)"
                  value={sleepScore}
                  onChange={(e) => setSleepScore(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="tag"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tag
                </label>
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  placeholder="E.g. 'May' (Optional)"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Note Content
                </label>
                <textarea
                  id="content"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-500 hover:bg-blue-600 transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4 mr-1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                {existingNote ? "Update Note" : "Create Note"}
              </button>
              {existingNote && (
                <button
                  type="button"
                  onClick={() => onDelete(existingNote?.id)}
                  className="text-white inline-flex items-center bg-red-500 hover:bg-red-600 transition focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4 mr-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete Note
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
