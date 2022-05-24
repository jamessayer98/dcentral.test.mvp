import { IProviderInfo } from "../../helpers";
import MetaMaskLogo from "../logos/metamask.svg";

export const injecteds: Array<IProviderInfo> = [
  {
    id: "injected",
    name: "MetaMask",
    logo: MetaMaskLogo,
    type: "injected",
    check: "isMetaMask",
  },
];
