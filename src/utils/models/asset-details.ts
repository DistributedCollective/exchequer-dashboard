import type { AbiItem } from 'web3-utils';
import type { Asset } from '../types';
import type { ContractName } from '../types';
import { appContracts } from '../blockchain/app-contracts';

interface ContractInterface {
  address: string;
  abi: AbiItem | AbiItem[] | any;
}

export class AssetDetails {
  public tokenContract: ContractInterface;
  constructor(
    public asset: Asset,
    public symbol: string,
    public name: string,
    public decimals: number,
    public logoSvg: string,
  ) {
    this.tokenContract = appContracts[this.getTokenContractName()];
  }

  public getTokenContractName(): ContractName {
    return (this.asset + '_token') as ContractName;
  }
  public getTokenContractAddress(): string {
    return this.tokenContract.address;
  }
}
