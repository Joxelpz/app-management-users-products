import decode from "jwt-decode";

export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// Devuelve el token del almacenamiento para la sesión
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

// Elimina el token y el usuario del almacenamiento de la sesión
export const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Configur el token y el usuario desde el almacenamiento de la sesión
export const setUserSession = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

//  Token caducado
export const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired. N
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};