export interface ICoreOptions {
  id: string;
  name: string;
  type: string;
  check: string;
}

export interface IProviderDisplay {
  name: string;
  logo: string;
  description?: string;
}

export interface IProviderControllerOptions {
  disableInjectedProvider: boolean;
  cacheProvider: boolean;
  providerOptions: IProviderOptions;
  network: string;
}

export interface IProviderOptions {
  [id: string]: {
    package: any;
    options?: any;
    connector?: Connector;
    display?: Partial<IProviderDisplay>;
  };
}

export type Connector = (provider?: any, opts?: any) => Promise<any>;

export interface IProviderInfo extends IProviderDisplay {
  id: string;
  type: string;
  check: string;
  package?: IProivderPackageOptions;
}

export interface IProivderPackageOptions {
  required?: RequiredOption[];
}

export type RequiredOption = string | string[];

export type ChainData = {
  chainId: number;
  chain: string;
  network: string;
  networkId: number;
};

export type ChainDataList = {
  [chainId: number]: ChainData;
};

export interface IAbstractConnectorOptions {
  network: string;
}

export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IParsedTx {
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  nonce: string;
  gasPrice: string;
  gasUsed: string;
  fee: string;
  value: string;
  input: string;
  error: boolean;
  asset: IAssetData;
  operations: ITxOperation[];
}

export interface ITxOperation {
  asset: IAssetData;
  value: string;
  from: string;
  to: string;
  functionName: string;
}

export interface IGasPrices {
  timestamp: number;
  slow: IGasPrice;
  average: IGasPrice;
  fast: IGasPrice;
}

export interface IGasPrice {
  time: number;
  price: number;
}
