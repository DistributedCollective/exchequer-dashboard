import React from 'react';
import { Identicon } from '../Identicon';
import { LinkToExplorer } from '../LinkToExplorer';
import type { MonitoringAccount } from './types';
import { BalanceRenderer } from './BalanceRenderer';

interface Props {
  item: MonitoringAccount;
}

export function MonitoringAccountItem({ item }: Props) {
  return (
    <div
      className="py-2 px-4 bg-light bg-opacity-5 rounded-lg mb-8 w-full"
      key={item.id}
    >
      <div className="flex flex-row justify-start items-center space-x-4">
        <div className="w-8 lg:w-24 flex-shrink-0">
          <Identicon value={item.address} />
        </div>
        <div className="w-1/2 lg:w-48 flex-shrink-0 truncate">{item.name}</div>
        <div className="hidden lg:block flex-grow truncate">
          <LinkToExplorer value={item.address} chainId={item.chainId} />
        </div>
        <div className="hidden lg:block lg:w-16 lg:flex-shrink-0">
          {item.asset}
        </div>
        {item.status === 'pending_for_approval' ? (
          <div className="w-1/2 lg:w-52 text-right text-light text-opacity-50 lg:flex-shrink-0">
            Pending<span className="hidden lg:inline"> for approval</span>
          </div>
        ) : (
          <>
            <div className="w-1/2 text-right lg:w-24 lg:text-left lg:flex-shrink-0">
              <BalanceRenderer
                balance={item.balance}
                threshold={item.threshold}
              />
              <span className="ml-2 lg:hidden">{item.asset}</span>
            </div>
            <div className="hidden lg:block lg:w-24 lg:flex-shrink-0">
              {item.threshold}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
