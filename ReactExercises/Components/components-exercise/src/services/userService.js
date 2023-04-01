const baseUrl = "http://localhost:3005/api/users";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();

  return result.users;
};

export const getOne = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
  const result = await response.json();

  return result.user;
};

export const deleteUser = async (userId) => {
  await fetch(`${baseUrl}/${userId}`, { method: "Delete" })
    .then((res) => {
      console.log("Deleted user with id = " + userId);
      return userId;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createUser = async (data) => {
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    imageUrl: data.imageUrl,
    address: {
      country: data.country,
      city: data.city,
      street: data.street,
      streetNumber: data.streetNumber,
    },
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${baseUrl}`, requestOptions);
  const result = await response.json();

  return result.user;
};

export const editUser = async (data, userId) => {
  console.log(data);

  const editedUser = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    imageUrl: data.imageUrl,
    address: {
      country: data.country,
      city: data.city,
      street: data.street,
      streetNumber: data.streetNumber,
    },
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedUser),
  };

  console.log(`${baseUrl}/${userId}`);

  const response = await fetch(`${baseUrl}/${userId}`, requestOptions);
  const result = await response.json();

  return result.user;
};
