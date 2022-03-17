const BASE_URL = "http://localhost:8080/api";

export const fetcher = async ({ url, method, token = null, data = null }) => {
  try {
    let res;
    if (method === "GET") {
      res = await fetch(`${BASE_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          Origin: "http://localhost:3000/",
        },
        method: "GET",
      });
    } else {
      res = await fetch(`${BASE_URL}/${url}`, {
        headers: {
          Accept: "application/json",
          Origin: "http://localhost:3000/",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    const resJson = await res.json();

    return [resJson, res.ok ? null : resJson.error];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
