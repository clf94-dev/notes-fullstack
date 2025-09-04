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

export const requestEditNote = async (noteId, data) => {
  return makeCall({
    url: `/api/notes/${noteId}`,
    method: "PUT",
    body: data,
  }).catch((error) => {
    throw error;
  });
};

export const requestArchiveNote = async (noteId) => {
  return makeCall({
    url: `/api/notes/${noteId}/archive`,
    method: "PATCH",
  }).catch((error) => {
    throw error;
  });
};

export const requestRestoreNote = async (noteId) => {
  return makeCall({
    url: `/api/notes/${noteId}/restore`,
    method: "PATCH",
  }).catch((error) => {
    throw error;
  });
};

export const requestDeleteNote = async (noteId) => {
  return makeCall({
    url: `/api/notes/${noteId}`,
    method: "DELETE",
  }).catch((error) => {
    throw error;
  });
};
