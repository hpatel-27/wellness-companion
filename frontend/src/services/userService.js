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

const updateUserProfile = async (auth, setAuth, profileData) => {
  const response = await authFetch(
    USER_PROFILE_URL,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    },
    auth,
    setAuth
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      `Error updating the user's profile: ${response.statusText}`
    );
  }
};

export default { getUserProfile, updateUserProfile };
