// Take the datetime format from django and turn it into
// a user-friendly format
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

const Note = ({ note, handleClick }) => {
  return (
    <div
      className="border border-gray-200 bg-gray-100 rounded-lg p-4 shadow-md hover:bg-gray-200 transition cursor-pointer"
      onClick={() => handleClick(note.title)}
    >
      <h3 className="text-lg font-medium text-gray-800">{note.title}</h3>
      <p className="text-sm text-gray-800">
        Last updated: <span>{formatDate(note.updated_at)}</span>
      </p>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{note.content}</p>
      <div className="flex justify-end space-x-3">
        {note?.sleep_score && (
          <p className="bg-blue-400 rounded-2xl text-white p-2 text-xs italic mt-2">
            <span className="">Sleep Score: </span>
            {note?.sleep_score}
          </p>
        )}
        {note?.mood && (
          <p className="bg-blue-400 rounded-2xl text-white p-2 text-xs italic mt-2">
            {note?.mood}
          </p>
        )}
        {note?.tag && (
          <p className="bg-blue-400 rounded-2xl text-white p-2 text-xs italic mt-2">
            #{note?.tag}
          </p>
        )}
      </div>
    </div>
  );
};

export default Note;
