export type AccountType = 'confirmed' | 'pending_for_approval' | 'pending_for_removal';

export type ViewableAccount = {
  id: number;
  name: string;
  address: string;
  chainId: number;
  tokens: ViewableAccountToken[];
  status: AccountType;
}

export type ViewableAccountToken = {
  name: string;
  address: string;
  balance: string;
  decimals: number;
};
