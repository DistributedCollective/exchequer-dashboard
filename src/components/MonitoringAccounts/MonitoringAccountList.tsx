import React, { useState } from 'react';
import { Legend } from '../Legend';
import { MonitoringAccountItem } from './MonitoringAccountItem';
import type { MonitoringAccount } from './types';
import { ReactComponent as IconExpand } from '../../assets/icon-expand.svg';
import cn from 'classnames';

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
    asset: 'rBTC',
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
    asset: 'ETHS',
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
    asset: 'USDT',
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
  const [isListVisible, setIsListVisible] = useState<boolean>(true);
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };
  return (
    <>
      <Legend
        title="Monitoring"
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
              <div className="flex-col flex-1">Account Name</div>
              <div className="flex-col flex-1 hidden lg:block">Network</div>
              <div className="flex-col flex-3 hidden lg:block flex-initial xl:w-96 sm:w-64">
                Account Address
              </div>
              <div className="flex-col flex-1 hidden lg:block">Asset Name</div>
              <div className="flex-col flex-1 hidden lg:block">Balance</div>
              <div className="flex-col flex-1 hidden lg:block">
                Balance Threshold
              </div>
              <div className="flex-1 flex justify-end items-center" />
            </div>
          </div>
          {items.map(item => (
            <MonitoringAccountItem key={item.id} item={item} />
          ))}
        </>
      )}
    </>
  );
}
