import React, { useState } from 'react';
import { ViewableAccountItem } from './ViewableAccountItem';
import type { ViewableAccount } from './types';
import { Legend } from '../Legend';
import cn from 'classnames';
import { ReactComponent as IconExpand } from '../../assets/icon-expand.svg';

const items: ViewableAccount[] = [
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
  const [isListVisible, setIsListVisible] = useState<boolean>(true);
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };
  return (
    <>
      <Legend
        title="Viewing"
        className="my-12"
        rightElement={
          <button
            type="button"
            onClick={toggleListVisibility}
            className={cn(
              !isListVisible && 'active',
              'flex items-center btn-sm border rounded-full py-0.5 px-3 text-xs hover:bg-light hover:bg-opacity-10 transition',
            )}
          >
            Most Active{' '}
            <IconExpand
              className={cn(
                !isListVisible && 'transform rotate-180',
                'w-5 transition',
              )}
            />
          </button>
        }
      />
      {isListVisible && (
        <>
          <div className="px-4 my-4">
            <div className="flex flex-row space-x-4 justify-start items-center font-medium text-xs">
              <div className="flex-col xl:w-16 w-12 flex-none" />
              <div className="w-full lg:w-48 lg:flex-shrink-0">
                Account Name
              </div>
              <div className="hidden lg:block lg:flex-grow">
                Account Address
              </div>
            </div>
          </div>
          {items.map(item => (
            <ViewableAccountItem key={item.id} item={item} />
          ))}
        </>
      )}
    </>
  );
}
