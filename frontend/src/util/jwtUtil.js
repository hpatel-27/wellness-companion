import jwt_decode from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const { exp } = jwt_decode(token);
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
}
