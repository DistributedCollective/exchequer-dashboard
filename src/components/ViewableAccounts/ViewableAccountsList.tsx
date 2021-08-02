import React from 'react';
import { ViewableWallet } from './ViewableAccountItem';
import type { ViewableAccount } from './types';
import { Button } from '../Button';
import { Legend } from '../Legend';

const items: ViewableAccount[] = [
  {
    id: 0,
    name: 'Account #0',
    status: 'pending_for_approval',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e030',
    chainId: 1,
    tokens: [],
  },
  {
    id: 1,
    name: 'Account #1',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e031',
    chainId: 1,
    tokens: [
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
    ],
  },
  {
    id: 2,
    name: 'Account #2',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e032',
    chainId: 1,
    tokens: [
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
      {
        name: 'ETH',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        balance: '10000000000000',
        decimals: 18,
      },
    ],
  },
  {
    id: 3,
    name: 'Account #3',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e033',
    chainId: 1,
    tokens: [],
  },
  {
    id: 4,
    name: 'Account #4',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e034',
    chainId: 1,
    tokens: [],
  },
  {
    id: 5,
    name: 'Account #5',
    status: 'confirmed',
    address: '0x1AC567836a6c97eE69D800C1fe8b0Ae551f0e035',
    chainId: 1,
    tokens: [],
  },
];

export function ViewableAccountsList() {
  return (
    <>
      <Button text="Add Account" primary className="mt-3 mb-4" />
      <Legend title="Viewing" />
      <div className="px-4 my-4">
        <div className="flex flex-row space-x-4 justify-start items-center font-medium text-sm">
          <div className="w-8 lg:w-24 flex-shrink-0" />
          <div className="w-full lg:w-48 lg:flex-shrink-0">Account Name</div>
          <div className="hidden lg:block lg:flex-grow">Account Address</div>
        </div>
      </div>
      {items.map(item => (
        <ViewableWallet key={item.id} item={item} />
      ))}
    </>
  );
}
