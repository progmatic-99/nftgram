const BASE_URL = "http://localhost:8080/api";

export const fetcher = async (url, method, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: method,
      body: JSON.stringify(data),
      data: data,
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
