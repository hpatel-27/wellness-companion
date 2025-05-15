const JOURNAL_URL = import.meta.env.VITE_JOURNAL_API_URL;

import { authFetch } from "../util/authFetch";

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

export default { getJournal };
