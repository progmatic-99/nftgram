import { fetcher } from "../../utils/fetcher";

export async function getWalletDetails(token) {
  const data = await fetcher({ url: "wallet", method: "GET", token: token });

  if (data?.wallet) {
    return data.wallet;
  } else {
    return { opensea: "", rarible: "" };
  }
}
