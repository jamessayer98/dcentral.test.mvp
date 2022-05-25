import { IProviderInfo } from "../../helpers";

declare const window: any;

const ConnectToInjected = async (providerInfo: Partial<IProviderInfo>) => {
  let provider = null;
  const { check } = providerInfo;
  if (typeof window.ethereum !== "undefined") {
    if (!window.ethereum.providers) {
      provider = window.ethereum;
      try {
        await provider.request({ method: "eth_requestAccounts" });
        return provider;
      } catch (error) {
        throw new Error("User Rejected");
      }
    } else {
      if (check) {
        provider = window.ethereum.providers.find(
          (provider: any) => provider[check] === true
        );
        try {
          await provider.request({ method: "eth_requestAccounts" });
          return provider;
        } catch (error) {
          throw new Error("User Rejected");
        }
      }
    }
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else if (window.celo) {
    provider = window.celo;
  } else {
    throw new Error("No Web3 Provider found");
  }
  return provider;
};

export default ConnectToInjected;
