// For Vite projects, use import.meta.env; for Create React App, keep process.env
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import bcrypt from "bcryptjs";
import { makeCall } from "../../utils/httpHelper";

export const requestLogin = async ({ email, password }) => {
  console.log({ email, password });
  return makeCall({
    url: "/auth/login",
    method: "POST",
    body: { email, password },
  }).catch((error) => {
    console.log({ error });
    throw error;
  });
};

export const requestSignUp = async ({ email, password }) => {
  console.log({ email, password });

  const hashedPassword = await bcrypt.hash(String(password), 10);

  return makeCall({
    url: "/auth/sign-up",
    method: "POST",
    body: { email, password: hashedPassword },
  }).catch((error) => {
    console.log("requestSignUp", { error });
    throw error;
  });
};
