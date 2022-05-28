import { ICoreOptions } from "../modal/helpers";

export interface IWalletOptions extends ICoreOptions {
  address: string;
}

export const INITIAL_WALLET_OPTS: IWalletOptions = {
  id: "",
  name: "",
  check: "",
  type: "",
  address: "",
};

export const INITIAL_WEB3_STATE = {
  ethProvider: null,
  provider: null,
  signer: null,
};
