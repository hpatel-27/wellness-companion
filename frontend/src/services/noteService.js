import { authFetch } from "../util/authFetch";

const NOTES_URL = import.meta.env.VITE_NOTES_API_URL;

const getAllNotes = async (auth, setAuth) => {
  const response = await authFetch(NOTES_URL, { method: "GET" }, auth, setAuth);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error getting notes: ${response.statusText}`);
  }
};

const createNote = async (auth, setAuth, noteData) => {
  const response = await authFetch(
    NOTES_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    },
    auth,
    setAuth
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error creating note: ${response.statusText}`);
  }
};

const updateNote = async (auth, setAuth, updatedNote, noteId) => {
  const response = await authFetch(
    `${NOTES_URL}${noteId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    },
    auth,
    setAuth
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Error updating note: ${response.statusText}`);
  }
};

export default { getAllNotes, createNote, updateNote };
