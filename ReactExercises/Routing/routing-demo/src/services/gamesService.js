const baseUrl = "http://localhost:3030/jsonstore/games";

export const getAllGames = async () => {
  const data = await fetch(`${baseUrl}`);

  const result = await data.json();

  return Object.values(result);
};

export const createGame = async (data) => {
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

export const getGameById = async (id) => {
  const data = await fetch(`${baseUrl}/${id}`);
  const result = await data.json();

  return result;
};

export const deleteGameById = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        console.log("User has been deleted successfully");
      } else {
        console.log("There was a problem with deleting the user");
      }
    })
    .catch((e) => {
      console.log("Error deleting user: " + e);
    });
};
