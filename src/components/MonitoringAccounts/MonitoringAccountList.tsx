import React from 'react';
import { Legend } from '../Legend';
import { MonitoringAccountItem } from './MonitoringAccountItem';
import type { MonitoringAccount } from './types';

const items: MonitoringAccount[] = [
  {
    id: 0,
    name: 'Account #0',
    status: 'pending_for_approval',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e030',
    decimals: 18,
    asset: 'BTC',
    chainId: 1,
    balance: '0',
    threshold: '0',
  },
  {
    id: 1,
    name: 'Account #1',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e031',
    decimals: 18,
    asset: 'BTC',
    chainId: 1,
    balance: '1000',
    threshold: '0',
  },
  {
    id: 2,
    name: 'Account #2',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e032',
    decimals: 18,
    asset: 'BTC',
    chainId: 1,
    balance: '0',
    threshold: '1000',
  },
  {
    id: 3,
    name: 'Account #3',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e033',
    decimals: 18,
    asset: 'BTC',
    chainId: 1,
    balance: '500',
    threshold: '1000',
  },
  {
    id: 4,
    name: 'Account #4',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e034',
    decimals: 18,
    asset: 'BTC',
    chainId: 1,
    balance: '1000',
    threshold: '500',
  },
  {
    id: 5,
    name: 'Account #5',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e035',
    decimals: 18,
    asset: 'BTC',
    chainId: 1,
    balance: '1100',
    threshold: '1000',
  },
];

export function MonitoringAccountList() {
  return (
    <>
      <Legend title="Monitoring" className="my-12" />
      <div className="px-4 my-4">
        <div className="flex flex-row space-x-4 justify-start items-center font-medium text-sm">
          <div className="w-8 lg:w-24 flex-shrink-0" />
          <div className="w-1/2 flex-shrink-0 lg:w-48">Account Name</div>
          <div className="hidden lg:block flex-grow">Account Address</div>
          <div className="hidden lg:block lg:w-16 lg:flex-shrink-0">Asset</div>
          <div className="w-1/2 text-right lg:w-24 lg:text-left lg:flex-shrink-0">
            Balance
          </div>
          <div className="hidden lg:block lg:w-24 lg:flex-shrink-0">
            Threshold
          </div>
        </div>
      </div>
      {items.map(item => (
        <MonitoringAccountItem key={item.id} item={item} />
      ))}
    </>
  );
}
