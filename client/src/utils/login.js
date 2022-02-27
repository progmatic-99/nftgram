import detectEthereumProvider from "@metamask/detect-provider";

export const connectMetamask = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    console.log(provider);
    return true;

    // From now on, this should always be true:
    // provider === window.ethereum

    // Access the decentralized web!

    // Legacy providers may only have ethereum.sendAsync
    // const chainId = await provider.request({
    //   method: 'eth_chainId'
    // })
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    return false;
  }
};

export const connectPhantom = async () => {
  try {
    const resp = await window.solana.connect();
    console.log(resp.publicKey.toString());
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
