export type AccountStatus = 'Approved';

export type ViewableAccount = {
  id: string;
  address: string;
  walletName: string;
  adminAddress: string;
  createdAt: Date;
  updatedAt: Date;
  balances: Nullable<ViewableAccountToken[]>;
  chainId: number;
  exchangeName: Nullable<string>;
  isLpTokensOwner: boolean;
  status: AccountStatus;
  votingIteration: number;
};

export type ViewableAccountToken = {
  symbol: string;
  address: string;
  balance: string;
  decimal: number;
};
