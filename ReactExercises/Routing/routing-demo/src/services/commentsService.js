const baseUrl = "http://localhost:3030/jsonstore/comments";

export const createComment = async (data) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export const getAllComments = async () => {
  const response = await fetch(`${baseUrl}`);

  const result = await response.json();

  return Object.values(result);
};
