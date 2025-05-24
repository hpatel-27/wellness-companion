import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import authService from "../services/authService";

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
    try {
      // call the service to login a user
      const response = await authService.loginUser(username, password);
      // the response is already checked to be okay
      const accessToken = response.access;
      const refreshToken = response.refresh;

      // state update is async and we need access to the auth object elsewhere
      const authObject = { username, accessToken, refreshToken };
      setAuth(authObject);
    } catch (error) {
      throw new Error("Error: ", error)();
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
