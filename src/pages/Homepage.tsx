import React from 'react';
import { ViewableAccountsList } from '../components/ViewableAccounts/ViewableAccountsList';
import { MonitoringAccountList } from '../components/MonitoringAccounts/MonitoringAccountList';
import { AuthContainer } from '../containers/AuthContainer';
import { EngageWallet } from '../containers/EngageWalletContainer/loadable';

export function Homepage() {
  return (
    <AuthContainer>
      <div className="container pt-4 text-right">
        <EngageWallet />
      </div>
      <div className="container pt-28">
        <h1 className="mb-16">Viewing & Monitoring Panel</h1>
        <ViewableAccountsList />
        <MonitoringAccountList />
      </div>
    </AuthContainer>
  );
}
