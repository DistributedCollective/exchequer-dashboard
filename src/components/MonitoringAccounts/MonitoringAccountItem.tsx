import React, { useCallback, useState } from 'react';
import { Identicon } from '../Identicon';
import { LinkToExplorer } from '../LinkToExplorer';
import type { MonitoringAccount } from './types';
import { BalanceRenderer } from './BalanceRenderer';
import { ReactComponent as IconDelete } from '../../assets/icon-delete.svg';
import { RemoveAccountDialog } from '../RemoveAccountDialog';
import { useAuthContext } from '../../containers/AuthContainer';
import { httpClient } from '../../utils/http-client';
import { tokenBalanceFormatted } from '../../utils/helpers';

interface MonitoringAccountItemProps {
  item: MonitoringAccount;
}

export function MonitoringAccountItem({ item }: MonitoringAccountItemProps) {
  const { role, onStateRefreshed } = useAuthContext();
  const [isClickForRemove, setIsClickForRemove] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const onRemoveAccount = useCallback(() => {
    httpClient
      .delete(`wallet/monitor/${item.id}`)
      .then(result => {
        setDeleted(true);
        onStateRefreshed(new Date());
      })
      .catch(console.error);
  }, [item, onStateRefreshed]);

  const toggleRemoveDialog = useCallback(() => {
    setIsClickForRemove(prevState => !prevState);
  }, []);

  if (deleted) {
    return <React.Fragment key={item.id} />;
  }

  return (
    <div
      className="py-2 px-4 bg-light bg-opacity-5 rounded-lg mb-5 w-full text-sm"
      key={item.id}
    >
      <div className="flex flex-row justify-start items-center space-x-4">
        <div className="flex-col xl:w-16 w-12 flex-none">
          <Identicon value={item.address} />
        </div>
        <div className="flex-col flex-1 truncate">{item.walletName}</div>
        <div className="hidden lg:block flex-col flex-1 truncate">Ethereum</div>
        <div className="flex-col flex-3 hidden lg:block flex-initial xl:w-96 sm:w-64 truncate">
          <LinkToExplorer value={item.address} chainId={item.chainId} />
        </div>
        <div className="hidden lg:flex items-center flex-row flex-1">
          {/*<img*/}
          {/*  className="w-6 h-full mr-1"*/}
          {/*  src={AssetsDictionary.get(item.asset).logoSvg}*/}
          {/*  alt={item.assetName}*/}
          {/*/>*/}
          {item.assetName}
          {/*<AssetSymbolRenderer asset={item.assetName} />*/}
        </div>
        {item.status === 'pending_for_approval' ? (
          <>
            <div className="hidden lg:block flex-col flex-1" />
            <div className="flex-2 text-right text-light text-opacity-50 flex-grow xl:w-32 w-28">
              Pending<span className="hidden lg:inline"> for approval</span>
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:block flex-col flex-1">
              <BalanceRenderer
                balance={item.balance}
                threshold={item.threshold || '0'}
                decimals={item.assetDecimals}
              />
              <span className="ml-2 lg:hidden">{item.assetName}</span>
            </div>
            <div className="hidden lg:block flex-col flex-1">
              {tokenBalanceFormatted(
                item.threshold || '0',
                4,
                item.assetDecimals,
              )}
            </div>
            <div className="flex-1 flex justify-end items-center">
              {['Approved', 'pending_for_removal'].includes(item.status) &&
                role === 'signer' && (
                  <div className="btn-toggler__wrapper">
                    <button
                      className="rounded p-0 hover:bg-light hover:bg-opacity-10 active:bg-opacity-100 active:text-dark"
                      type="button"
                    >
                      <IconDelete
                        onClick={toggleRemoveDialog}
                        className="w-5 h-5"
                      />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                )}
              <RemoveAccountDialog
                item={item}
                isOpen={isClickForRemove}
                onClose={() => setIsClickForRemove(false)}
                onRemove={onRemoveAccount}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
