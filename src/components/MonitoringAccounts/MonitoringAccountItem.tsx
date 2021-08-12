import React from 'react';
import { Identicon } from '../Identicon';
import { LinkToExplorer } from '../LinkToExplorer';
import type { MonitoringAccount } from './types';
import { BalanceRenderer } from './BalanceRenderer';
import { ReactComponent as IconDelete } from '../../assets/icon-delete.svg';

interface Props {
  item: MonitoringAccount;
}

export function MonitoringAccountItem({ item }: Props) {
  return (
    <div
      className="py-2 px-4 bg-light bg-opacity-5 rounded-lg mb-5 w-full text-sm"
      key={item.id}
    >
      <div className="flex flex-row justify-start items-center space-x-4">
        <div className="flex-col xl:w-16 w-12 flex-none">
          <Identicon value={item.address} />
        </div>
        <div className="flex-col flex-1 truncate">{item.name}</div>
        <div className="hidden lg:block flex-col flex-1 truncate">Ethereum</div>
        <div className="flex-col flex-3 hidden lg:block flex-initial xl:w-96 sm:w-64 truncate">
          <LinkToExplorer value={item.address} chainId={item.chainId} />
        </div>
        <div className="hidden lg:block flex-col flex-1">{item.asset}</div>
        {item.status === 'pending_for_approval' ? (
          <>
            <div className="hidden lg:block flex-col flex-1"></div>
            <div className="flex-2 text-right text-light text-opacity-50 flex-grow xl:w-32 w-28">
              Pending<span className="hidden lg:inline"> for approval</span>
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:block flex-col flex-1">
              <BalanceRenderer
                balance={item.balance}
                threshold={item.threshold}
              />
              <span className="ml-2 lg:hidden">{item.asset}</span>
            </div>
            <div className="hidden lg:block flex-col flex-1">
              {item.threshold}
            </div>
            <div className="flex-1 flex justify-end items-center">
              {['confirmed', 'pending_for_removal'].includes(item.status) && (
                <div className="btn-toggler__wrapper">
                  <button
                    className="rounded p-0 hover:bg-light hover:bg-opacity-10"
                    type="button"
                  >
                    <IconDelete className="w-5 h-5" />
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
