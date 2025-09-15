const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const makeCall = async (props) => {
  const { url, body, method, params } = props;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };

  console.log({ params });
  const options = {
    method: method || "GET",
    headers,
    body: JSON.stringify(body),
  };

  console.log({ options, url, API_URL });

  try {
    const response = await fetch(
      `${API_URL}${url}${params ? `?${new URLSearchParams(params)}` : ""}`,
      options
    );

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
      return;
    }
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
