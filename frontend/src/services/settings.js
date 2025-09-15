import { makeCall } from "@/utils/httpHelper";

export const requestChangePassword = async (data) => {
  return makeCall({
    url: "/api/user/reset-password",
    method: "PATCH",
    body: data,
  }).catch((error) => {
    throw error;
  });
};
