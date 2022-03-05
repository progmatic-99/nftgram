import detectEthereumProvider from "@metamask/detect-provider";

export const connectMetamask = async () => {
  const provider = await detectEthereumProvider();
  console.log(provider);

  if (provider) {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    const account = accounts[0];
    console.log(account);
    return account;

    // From now on, this should always be true:
    // provider === window.ethereum

    // Access the decentralized web!

    // Legacy providers may only have ethereum.sendAsync
    // const chainId = await provider.request({
    //   method: 'eth_chainId'
    // })
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    return err;
  }
};

export const connectPhantom = async () => {
  try {
    const resp = await window.solana.connect();
    const account = resp.publicKey.toString();

    return account;
  } catch (err) {
    return err;
  }
};
