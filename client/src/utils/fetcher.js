const BASE_URL = "http://localhost:8080/api";

export const fetcher = async (url, method, data = null, token = null) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        Origin: "http://localhost:3000/",
      },
      method: method,
      body: JSON.stringify(data),
    });
    const resJson = res.json();

    return [
      resJson,
      res.staus >= 200 && res.status <= 400 ? null : resJson.error,
    ];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
