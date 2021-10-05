import { lazyLoad } from '../../utils/loadable';

export const EngageWallet = lazyLoad(
  () => import('./index'),
  module => module.EngageWalletContainer,
);
