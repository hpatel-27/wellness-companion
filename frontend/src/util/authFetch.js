import { isTokenExpired } from "./jwtUtil";

export async function authFetch(url, options = {}, auth, setAuth) {
  if (isTokenExpired(auth.accessToken)) {
    const refreshResponse = await fetch("/auth/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: auth.refreshToken }),
    });

    const refreshData = await refreshResponse.json();

    if (refreshResponse.ok) {
      const updatedAuth = { ...auth, accessToken: refreshData.access };
      setAuth(updatedAuth);
      auth = updatedAuth;
    } else {
      setAuth(null);
      throw new Error("Session expired. Please log in again.");
    }
  }

  // Continue on with the original request
  const finalOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  return fetch(url, finalOptions);
}
