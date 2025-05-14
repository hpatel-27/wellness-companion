import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LOGIN_API_URL = import.meta.env.VITE_LOGIN_API_URL;
// const REGISTER_API_URL = import.meta.env.VITE_REGISTER_API_URL;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const login = async (username, password) => {
    // send a POST request to the server
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    const token = data.access_token;

    if (response.ok) {
      setAuth({ username, token });
      return true;
    } else {
      throw new Error("Invalid credentials.");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
