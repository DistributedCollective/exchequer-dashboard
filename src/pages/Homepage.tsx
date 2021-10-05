import React from 'react';
import { ViewableAccountsList } from '../components/ViewableAccounts/ViewableAccountsList';
import { MonitoringAccountList } from '../components/MonitoringAccounts/MonitoringAccountList';
import { EngageWallet } from '../containers/EngageWalletContainer/loadable';
import { useAuthContext } from '../containers/AuthContainer';
import { NewProposalContainer } from '../containers/NewProposalContainer/loadable';

export function Homepage() {
  const { wallet, role } = useAuthContext();
  return (
    <>
      <div className="container pt-4 text-right">
        <EngageWallet />
      </div>
      {/*{wallet?.connected && (*/}
      {/*  <InformAccounts*/}
      {/*    accountName="Account Name"*/}
      {/*    accountAddress="0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e038"*/}
      {/*  />*/}
      {/*)}*/}
      <div className="container pt-28">
        <h1 className="mb-16">Viewing & Monitoring Panel</h1>
        {wallet?.connected && role === 'signer' && <NewProposalContainer />}
        {/*<PendingAccountsList />*/}
        <ViewableAccountsList />
        <MonitoringAccountList />
      </div>
    </>
  );
}
