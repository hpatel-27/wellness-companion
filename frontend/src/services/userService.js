const REGISTER_API_URL = import.meta.env.VITE_REGISTER_API_URL;
const LOGIN_API_URL = import.meta.env.VITE_LOGIN_API_URL;

// Use the username and password provided from the user's
// input and return the data that is necessary for
// successful token extraction
const loginUser = async (username, password) => {
  // send a POST request to the server
  const response = await fetch(LOGIN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Invalid credentials.");
  }
};

// Take the username and password provided from the user
// and send it to the backend for user registration
const registerUser = async (username, password) => {
  // send a POST request to the backend to create the user
  const response = await fetch(REGISTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Account creation failed. ");
  }
};

export default { loginUser, registerUser };
