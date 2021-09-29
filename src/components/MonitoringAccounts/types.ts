export type AccountType =
  | 'Approved'
  | 'pending_for_approval'
  | 'pending_for_removal';

export type MonitoringAccount = {
  id: string;
  address: string;
  adminAddress: string;
  assetContractAddress: string;
  assetDecimals: number;
  assetName: string;
  balance: string;
  balanceLastUpdated: Date;
  chainId: number;
  createdAt: Date;
  exchangeName: Nullable<string>;
  notificationLastSent: Nullable<Date>;
  status: AccountType;
  threshold: Nullable<string>;
  updatedAt: Date;
  votingIteration: number;
  walletName: string;
};
