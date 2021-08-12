import React from 'react';
import { PendingAccountItem } from './PendingAccountItem';
import type { PendingAccount } from './types';
import { Legend } from '../Legend';

const items: PendingAccount[] = [
  {
    id: 0,
    name: 'Account Name',
    status: 'pending_for_approval',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e031',
    chainId: 1,
  },
  {
    id: 1,
    name: 'Account Name',
    status: 'pending_for_removal',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e031',
    chainId: 1,
  },
];

export function PendingAccountsList() {
  return (
    <>
      <Legend title="Pending" className="my-12" />
      <div className="px-4 my-4">
        <div className="flex flex-row space-x-4 justify-start items-center font-medium text-xs">
          <div className="flex-col xl:w-16 w-12 flex-none" />
          <div className="flex-col flex-1">Account Name</div>
          <div className="flex-col flex-1 hidden lg:block">Network</div>
          <div className="flex-col flex-1 hidden lg:block">Account Address</div>
          <div className="flex-col flex-1 hidden lg:block">Account Type</div>
          <div className="flex-col flex-1 hidden lg:block">Asset Name</div>
          <div className="flex-col flex-3 flex-initial sm:w-96">Action</div>
        </div>
      </div>
      {items.map(item => (
        <PendingAccountItem key={item.id} item={item} />
      ))}
    </>
  );
}
