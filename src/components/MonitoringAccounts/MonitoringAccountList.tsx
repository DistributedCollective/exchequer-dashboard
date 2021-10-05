import React, { useState } from 'react';
import { Legend } from '../Legend';
import { MonitoringAccountItem } from './MonitoringAccountItem';
import type { MonitoringAccount } from './types';
import { ReactComponent as IconExpand } from '../../assets/icon-expand.svg';
import cn from 'classnames';
import { useFetch } from '../../hooks/useFetch';
import { useAuthContext } from '../../containers/AuthContainer';

export function MonitoringAccountList() {
  const { stateRefreshed } = useAuthContext();
  const { data: items, loading } = useFetch<MonitoringAccount[]>(
    'wallet/monitor',
    stateRefreshed,
  );
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
            Toggle Visibility{' '}
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
          {loading && !items ? (
            <div className="py-2 px-4 bg-light bg-opacity-5 rounded-lg mb-5 w-full text-sm">
              Loading
            </div>
          ) : (
            items &&
            items.map(item => (
              <MonitoringAccountItem key={item.id} item={item} />
            ))
          )}
        </>
      )}
    </>
  );
}
