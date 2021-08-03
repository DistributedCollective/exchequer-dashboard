import { lazyLoad } from '../../utils/loadable';

export const NewProposalContainer = lazyLoad(
  () => import('./index'),
  module => module.NewProposalContainer,
);
