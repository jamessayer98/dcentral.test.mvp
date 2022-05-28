import {
  FC,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
  createContext,
  useContext,
} from "react";
import { INITIAL_WEB3_STATE } from "../helpers/constants";

type Props = {
  children: ReactNode;
};

interface IWeb3Context {
  web3: {
    ethProvider: any;
    provider: any;
    signer: any;
  };
  setWeb3: Dispatch<
    SetStateAction<{
      ethProvider: any;
      provider: any;
      signer: any;
    }>
  >;
}

const Web3Context = createContext<IWeb3Context>(null);

export const Web3Provider: FC<Props> = ({ children }) => {
  const [web3value, setweb3Value] = useState(INITIAL_WEB3_STATE);

  return (
    <Web3Context.Provider
      value={{
        web3: web3value,
        setWeb3: setweb3Value,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const { web3, setWeb3 } = useContext(Web3Context);
  return {
    web3,
    setWeb3,
  };
};
