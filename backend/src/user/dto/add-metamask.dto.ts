import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ConnectMetamaskDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Metamask address must be a valid Ethereum address',
  })
  metamaskAddress: string;
}
