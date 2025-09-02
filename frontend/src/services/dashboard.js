import { makeCall } from "../utils/httpHelper";

export const fetchTagsData = async () => {
  console.log("fetchTagsData");
  return makeCall({ url: "/api/tags" }).catch((error) => {
    console.log({ error });
    throw error;
  });
};

export const requestNotes = async () => {
  console.log("requestNotes");
  return makeCall({ url: "/api/notes" }).catch((error) => {
    throw error;
  });
};
