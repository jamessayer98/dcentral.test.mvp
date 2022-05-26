import { providers } from "ethers";
import { Connector, ICoreOptions, IProviderInfo } from "../helpers";
import { connectors } from "../providers";
import { ACCOUNT_CHANGED_EVENT, CHAIN_CHANGED_EVENT } from "../constants";

export class Core {
  private providerId: string;
  private providerName: string;
  private providerType: string;
  private providerCheck: string;

  constructor(opts: ICoreOptions) {
    const { id, name, type, check } = opts;
    this.providerId = id;
    this.providerName = name;
    this.providerType = type;
    this.providerCheck = check;
  }

  public connect: Connector = async ({ handleAccountChange }) => {
    try {
      const ethProvider = await this.getEthProvider();
      const provider = new providers.Web3Provider(ethProvider);
      const signer = provider.getSigner();
      this.subscribeToProivder(ethProvider, handleAccountChange);
      return { ethProvider, provider, signer };
    } catch (error) {
      throw new Error("Failed at connect(): " + error);
    }
  };

  public getEthProvider = async () => {
    const connector = connectors[this.providerId];
    let opts: Partial<IProviderInfo>;
    try {
      if (this.providerId === "injected" && this.providerName == "MetaMask") {
        opts = {
          name: this.providerName,
          check: this.providerCheck,
        };
        return await connector(opts);
      } else {
        //Unsupported wallet
        console.log("No supported wallet found!");
      }
    } catch (error) {
      throw new Error("Failed at getEthProvider(): " + error);
    }
  };

  public subscribeToProivder = (provider: any, handler: any) => {
    provider.on(ACCOUNT_CHANGED_EVENT, () => {
      this.eventHandler(ACCOUNT_CHANGED_EVENT, handler);
    });
    provider.on(CHAIN_CHANGED_EVENT, () => {
      this.eventHandler(CHAIN_CHANGED_EVENT, handler);
    });

    return () => {
      provider.removeListener(ACCOUNT_CHANGED_EVENT, this.eventHandler);
      provider.removeListener(CHAIN_CHANGED_EVENT, this.eventHandler);
    };
  };

  public unSubscribeToProvider = (provider: any) => {
    provider.removeListener(ACCOUNT_CHANGED_EVENT, this.eventHandler);
    provider.removeListener(CHAIN_CHANGED_EVENT, this.eventHandler);
  };

  private eventHandler(event: string, handler: any) {
    handler();
  }
}

export default Core;
