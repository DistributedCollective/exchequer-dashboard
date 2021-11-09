import React, { useMemo, useState } from 'react';
import { ViewableAccountItem } from './ViewableAccountItem';
import { Legend } from '../Legend';
import cn from 'classnames';
import { ReactComponent as IconExpand } from '../../assets/icon-expand.svg';
import { useFetch } from '../../hooks/useFetch';
import { ViewableAccount } from './types';
import { useAuthContext } from '../../containers/AuthContainer';
import { sortByField } from '../../utils/helpers';

export function ViewableAccountsList() {
  const { stateRefreshed } = useAuthContext();
  const { data, loading } = useFetch<ViewableAccount[]>(
    'wallet/view',
    stateRefreshed,
  );

  const [isListVisible, setIsListVisible] = useState<boolean>(true);
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const items = useMemo(
    () => (data || []).sort(sortByField<ViewableAccount>('createdAt', 'asc')),
    [data],
  );

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
              <div className="w-full lg:w-48 flex-1">Account Name</div>
              <div className="flex-col flex-1 hidden lg:block">Network</div>
              <div className="hidden lg:block lg:flex-grow flex-1">
                Account Address
              </div>
              <div className="lg:w-24 lg:flex-shrink-0 flex justify-end items-center" />
            </div>
          </div>
          {loading && !items ? (
            <div className="py-2 px-4 bg-light bg-opacity-5 rounded-lg mb-5 w-full text-sm">
              Loading
            </div>
          ) : (
            <>
              {items &&
                items.map(item => (
                  <ViewableAccountItem key={item.id} item={item} />
                ))}
            </>
          )}
        </>
      )}
    </>
  );
}
