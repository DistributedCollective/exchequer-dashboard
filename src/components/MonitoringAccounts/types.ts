import { Asset } from '../../utils/types'

export type AccountType =
  | 'confirmed'
  | 'pending_for_approval'
  | 'pending_for_removal';

export type MonitoringAccount = {
  id: number;
  name: string;
  address: string;
  chainId: number;
  status: AccountType;
  asset: Asset;
  decimals: number;
  balance: string;
  threshold: string;
};
