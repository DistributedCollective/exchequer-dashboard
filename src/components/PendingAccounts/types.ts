export type AccountType =
  'pending_for_approval'
  | 'pending_for_removal';

export type PendingAccount = {
  id: number;
  name: string;
  address: string;
  chainId: number;
  status: AccountType;
};
