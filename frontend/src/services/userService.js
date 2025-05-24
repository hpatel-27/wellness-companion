import { authFetch } from "../util/authFetch";
const USER_PROFILE_URL = import.meta.env.VITE_USER_PROFILE_URL;

const getUserProfile = async (auth, setAuth) => {
  const response = await authFetch(
    USER_PROFILE_URL,
    {
      method: "GET",
    },
    auth,
    setAuth
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      `Error fetching user profile information: ${response.statusText}`
    );
  }
};

export default { getUserProfile };
