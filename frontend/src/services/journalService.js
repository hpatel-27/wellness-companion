const JOURNAL_URL = import.meta.env.VITE_JOURNAL_API_URL;

import { authFetch } from "../util/authFetch";

// Get the journal for the current user
// A user has one journal
const getJournal = async (auth, setAuth) => {
  const response = await authFetch(
    JOURNAL_URL,
    { method: "GET" },
    auth,
    setAuth
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error fetching journal data.");
  }
};

// Update the user's journal
const updateJournal = async (title, auth, setAuth) => {
  const response = await authFetch(
    JOURNAL_URL,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    },
    auth,
    setAuth
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error updating journal.");
  }
};

// I don't want to allow deleting the user's journal
// They can just delete all their notes and start over if they want for some reason
// BUT UNDER NO CIRCUMSTANCES WILL YOU EVERRRR BE ALLOWED TO DELETE YOUR JOURNAL

export default { getJournal, updateJournal };
