import { AbiItem } from 'web3-utils';
import { contracts } from '../utils/blockchain/contracts';

export type UserRole = 'viewer' | 'reader' | 'signer';
export enum Asset {
  RBTC = 'RBTC',
  ETH = 'ETH',
  DOC = 'DOC',
  USDT = 'USDT',
  XUSD = 'XUSD',
  BPRO = 'BPRO',
  SOV = 'SOV',
  MOC = 'MOC',
  BNB = 'BNBS',
  FISH = 'FISH',
  BTC = 'BTC',
}

export type ContractName = keyof typeof contracts;
export type ContractData = { [contractName: string]: ContractItemData };
export type ContractItemData = {
  address: string;
  abi: AbiItem | AbiItem[] | any;
  blockNumber: number;
};
