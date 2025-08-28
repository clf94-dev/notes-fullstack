const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const makeCall = async (props) => {
  const { url, body, method } = props;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const options = {
    method: method || "GET",
    headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${API_URL}${url}`, options);
    return handleTypeResponse(response);
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const handleTypeResponse = (response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      const parsedText = JSON.parse(text);
      throw parsedText.message;
    });
  }
  return response.json();
};
