import { authFetch } from "../util/authFetch";

const NOTES_URL = import.meta.env.VITE_NOTES_API_URL;
const NOTE_URL = import.meta.env.VITE_SINGLE_NOTE_API_URL;

const getAllNotes = () => {};

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

export default { getAllNotes, createNote };
