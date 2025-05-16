import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import userService from "../services/userService";

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
      const response = await userService.loginUser(username, password);
      // the response is already checked to be okay
      const accessToken = response.access;
      const refreshToken = response.refresh;

      setAuth({ username, accessToken, refreshToken });
      return true;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
