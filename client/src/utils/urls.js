let BASE_URL;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://qrator.onrender.com/api";
} else {
  BASE_URL = "http://localhost:8080/api";
}

const OPENSEA_URL = "https://api.opensea.io/api/v1/";
const RARIBLE_URL = "https://api.rarible.org/v0.1/";

export { BASE_URL, OPENSEA_URL, RARIBLE_URL };
