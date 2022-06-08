import React, { useCallback, useEffect, useState } from "react";
import { fetcher } from "../../utils/fetcher";

const useAllWallets = () => {
  const [wallets, setWallets] = useState(null);

  const getAllWallets = useCallback(async () => {
    const resp = await fetcher({ url: "wallets", method: "GET" });

    setWallets(resp?.wallets);
  }, []);

  useEffect(() => {
    getAllWallets();
  }, []);

  return [wallets];
};

export default useAllWallets;
