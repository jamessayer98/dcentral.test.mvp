import { INITIAL_WALLET_OPTS, IWalletOptions } from "../helpers/constants";
import { useLocalStorage } from "./useLocalStorage";

export const useWalletOpts = () => {
  const { value, setValue } = useLocalStorage<IWalletOptions>(
    "walletOpts",
    INITIAL_WALLET_OPTS
  );

  return {
    walletOpts: value,
    setWalletOpts: setValue,
  };
};
