// For Vite projects, use import.meta.env; for Create React App, keep process.env
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const requestLogin = async ({ email, password }) => {
  console.log({ email, password });
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
