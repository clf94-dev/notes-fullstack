import { makeCall } from "../utils/httpHelper";

export const fetchTagsData = async () => {
  console.log("fetchTagsData");
  return makeCall({ url: "/api/tags" }).catch((error) => {
    console.log({ error });
    throw error;
  });
};
