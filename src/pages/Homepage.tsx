import React from 'react';
import { ViewableAccountsList } from '../components/ViewableAccounts/ViewableAccountsList';
import { MonitoringAccountList } from '../components/MonitoringAccounts/MonitoringAccountList';
import { InformAccounts } from '../components/InformAccounts';
import { AuthContainer } from '../containers/AuthContainer';
import { EngageWallet } from '../containers/EngageWalletContainer/loadable';

export function Homepage() {
  return (
    <AuthContainer>
      <div className="container pt-4 text-right">
        <EngageWallet />
      </div>
      <InformAccounts
        accountName="Account Name"
        accountAddress="0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e038"
      />
      <div className="container pt-28">
        <h1 className="mb-16">Viewing & Monitoring Panel</h1>
        <ViewableAccountsList />
        <MonitoringAccountList />
      </div>
    </AuthContainer>
  );
}
