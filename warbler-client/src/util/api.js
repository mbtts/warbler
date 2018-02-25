const API_BASE = "/api";

const post = async (url, body, token) => {
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE + url, {
    method: "post",
    headers: new Headers(headers),
    body: JSON.stringify(body)
  });

  return await handleResponse(response);
};

const get = async url => {
  const response = await fetch(API_BASE + url);
  return await handleResponse(response);
};

const handleResponse = async response => {
  if (response.ok) {
    return response.json();
  } else if (response.status >= 400 && response.status < 500) {
    const error = await response.json();
    throw error;
  } else {
    throw Error(`An Error has ocurred (response ${response.status})`);
  }
};

const login = async (email, password) => {
  return await post("/auth/signin", { email, password });
};

const register = async (email, username, password, profileImageUrl) => {
  return await post("/auth/signup", {
    email,
    username,
    password,
    profileImageUrl
  });
};

const getMessages = async () => {
  return await get("/messages");
};

const createMessage = async (text, userId, token) => {
  return await post(`/users/${userId}/messages`, { text }, token);
};

export { login, register, getMessages, createMessage };
