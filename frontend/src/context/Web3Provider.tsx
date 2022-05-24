import {
  FC,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
  createContext,
  useContext,
} from "react";

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
  const [value, setValue] = useState({
    ethProvider: null,
    provider: null,
    signer: null,
  });

  return (
    <Web3Context.Provider
      value={{
        web3: value,
        setWeb3: setValue,
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
