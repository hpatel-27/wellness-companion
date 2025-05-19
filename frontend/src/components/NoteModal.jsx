import { useState } from "react";

const NoteModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [sleepScore, setSleepScore] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if there is no title or input just stop the submission and make them do it again
    if (!title || !content) return;

    // dont do any saving yet

    // close/hide the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="w-full border p-2 rounded resize-none"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mood (optional)"
            className="w-full border p-2 rounded"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sleep Score (optional)"
            className="w-full border p-2 rounded"
            value={sleepScore}
            onChange={(e) => setSleepScore(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tag (optional)"
            className="w-full border p-2 rounded"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
