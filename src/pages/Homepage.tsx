import React from 'react';
import { ViewableAccountsList } from '../components/ViewableAccounts/ViewableAccountsList';
import { MonitoringAccountList } from '../components/MonitoringAccounts/MonitoringAccountList';

export function Homepage() {
  return (
    <div className="container pt-28">
      <h1 className="mb-16">Viewing & Monitoring Panel</h1>
      <ViewableAccountsList />
      <MonitoringAccountList />
    </div>
  )
}
