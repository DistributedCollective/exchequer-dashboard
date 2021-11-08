import React, { useCallback, useState } from 'react';
import { Identicon } from '../Identicon';
import { RemoveAccountDialog } from '../RemoveAccountDialog';
import { LinkToExplorer } from '../LinkToExplorer';
import type { ViewableAccount } from './types';
import { Toggler } from './Toggler';
import { ReactComponent as IconDelete } from '../../assets/icon-delete.svg';
import {
  chainIdToNetworkName,
  ifGenesisThen,
  tokenBalanceFormatted,
} from '../../utils/helpers';
import { httpClient } from '../../utils/http-client';
import { useAuthContext } from '../../containers/AuthContainer';
import { bignumber } from 'mathjs';

interface ViewableAccountItemProps {
  item: ViewableAccount;
}

export function ViewableAccountItem({ item }: ViewableAccountItemProps) {
  const { role, onStateRefreshed } = useAuthContext();
  const [expanded, setExpanded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleToggle = useCallback(() => {
    setExpanded(prevState => !prevState);
  }, []);

  const onRemoveAccount = useCallback(() => {
    httpClient
      .delete(`wallet/view/${item.id}`)
      .then(() => {
        setDeleted(true);
        onStateRefreshed(new Date());
      })
      .catch(console.error);
  }, [item, onStateRefreshed]);

  const [isClickForRemove, setIsClickForRemove] = useState(false);
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
        <div className="xl:w-16 w-12 flex-none flex-1">
          <Identicon value={ifGenesisThen(item.address, item.walletName)} />
        </div>
        <div className="w-full lg:w-48 truncate flex-1">{item.walletName}</div>
        <div className="hidden lg:block flex-1 truncate">
          {chainIdToNetworkName(item.chainId)}
        </div>
        <div className="hidden lg:block lg:flex-grow flex-1 truncate">
          {!item.exchangeName && (
            <LinkToExplorer value={item.address} chainId={item.chainId} />
          )}
        </div>
        <div className="lg:w-24 lg:flex-shrink-0 flex justify-end items-center">
          {/*{item.status === 'pending_for_approval' && (*/}
          {/*  <span className="text-light text-opacity-50">Pending</span>*/}
          {/*)}*/}
          {['Approved', 'pending_for_removal'].includes(item.status) && (
            <>
              <div className="btn-toggler__wrapper">
                <Toggler isOpen={expanded} onClick={handleToggle} />
                {role === 'signer' && (
                  <button
                    className="rounded p-0 hover:bg-light hover:bg-opacity-10"
                    type="button"
                  >
                    <IconDelete
                      className="w-5 h-5"
                      onClick={toggleRemoveDialog}
                    />
                    <span className="sr-only">Delete</span>
                  </button>
                )}
              </div>
              <RemoveAccountDialog
                item={item}
                isOpen={isClickForRemove}
                onClose={() => setIsClickForRemove(false)}
                onRemove={onRemoveAccount}
              />
            </>
          )}
        </div>
      </div>
      {expanded && (
        <div className="mt-8 pl-2 lg:pl-16 max-h-56 overflow-y-auto">
          {item.balances && item.balances.length > 0 ? (
            item.balances.map((token, index) => (
              <div
                key={index}
                className="w-full flex flex-row justify-start items-center space-x-4 mb-4"
              >
                <div className="w-2/5 lg:w-36 flex-shrink-0 flex flex-row justify-start items-center space-x-4">
                  <span>{token.symbol}</span>
                </div>
                <div className="w-3/5 lg:w-48 truncate">
                  {tokenBalanceFormatted(
                    bignumber(token.balance)
                      .mul(Math.pow(10, item.exchangeName ? token.decimal : 0))
                      .toString(),
                    6,
                    token.decimal,
                  )}
                </div>
                <div className="hidden lg:block truncate">
                  <LinkToExplorer
                    value={token.address}
                    chainId={item.chainId}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Account has no balances</p>
          )}
        </div>
      )}
    </div>
  );
}
