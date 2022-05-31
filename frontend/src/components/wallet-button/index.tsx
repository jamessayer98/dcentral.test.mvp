import { FC, useEffect } from "react";
import Web3Modal from "../../modal/core";
import { ICoreOptions } from "../../modal/helpers";
import { FaWallet } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { useWeb3 } from "../../context/Web3Provider";
import {
  INITIAL_WALLET_OPTS,
  INITIAL_WEB3_STATE,
} from "../../helpers/constants";
import { useWalletOpts } from "../../hooks/useWalletOpts";

export const WalletButton: FC = () => {
  const { setWeb3 } = useWeb3();
  const { walletOpts, setWalletOpts } = useWalletOpts();
  const { address, id, type, check, name } = walletOpts;

  const handleConnect = async (opts: ICoreOptions) => {
    const web3Modal = new Web3Modal(opts);
    const { ethProvider, provider, signer } = await web3Modal.connect({
      handleAccountChange,
    });
    const address = await signer.getAddress();
    const walletOpts = { ...opts, address };
    setWeb3({ ethProvider, provider, signer });
    setWalletOpts(walletOpts);
  };

  const handleDisconnect = () => {
    setWeb3(INITIAL_WEB3_STATE);
    setWalletOpts(INITIAL_WALLET_OPTS);
  };

  const handleAccountChange = () => {
    handleDisconnect();
  };

  useEffect(() => {
    (async () => {
      if (address !== "") {
        const opts: ICoreOptions = { id, type, check, name };
        await handleConnect(opts);
      }
    })();
  }, []);

  return (
    <div>
      {address === "" ? (
        <Button
          colorScheme="purple"
          onClick={() => {
            const opts: ICoreOptions = {
              id: "injected",
              name: "MetaMask",
              type: "injected",
              check: "isMetaMask",
            };
            handleConnect(opts);
          }}
        >
          <FaWallet style={{ marginRight: "10px" }} />
          Connect MetaMask
        </Button>
      ) : (
        <Button onClick={handleDisconnect} colorScheme="purple">
          <FaWallet style={{ marginRight: "10px" }} />
          Disconnect
        </Button>
      )}
    </div>
  );
};
