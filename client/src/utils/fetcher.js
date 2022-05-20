import { BASE_URL } from "./urls";

export const fetcher = async ({ url, method, token = null, data = null }) => {
  let res;
  if (method === "GET") {
    if (token) {
      res = await fetch(`${BASE_URL}/${url}`, {
        headers: {
          Accept: "application/json",
          Origin: "http://localhost:3000/",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
    } else {
      res = await fetch(`${BASE_URL}/${url}`, {
        headers: {
          Accept: "application/json",
          Origin: "http://localhost:3000/",
        },
        method: "GET",
      });
    }
  } else {
    res = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        Origin: "http://localhost:3000/",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  const resJson = await res.json();
  console.log(resJson);

  return resJson;
};
