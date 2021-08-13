import React, { useState, useCallback } from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Tooltip } from '../Tooltip';
import { Identicon } from '../Identicon';
import { LinkToExplorer } from '../LinkToExplorer';
import type { PendingAccount } from './types';
import iconActions from '../../assets/icon-actions.svg';
import { prettyTx } from '../../utils/helpers';
import cn from 'classnames';
// import { ReactComponent as IconUndo } from '../../assets/icon-close.svg';

interface Props {
  item: PendingAccount;
}

export function PendingAccountItem({ item }: Props) {
  const [isActionVisible, setIsActionVisible] = useState<boolean>(false);
  const toggleActions = () => {
    setIsActionVisible(!isActionVisible);
  };

  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => {
    setOpen(prevState => !prevState);
  }, []);

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
        <div className="hidden lg:block flex-col flex-1">Ethereum</div>
        <div className="hidden lg:block flex-col flex-1">
          <Tooltip message={item.address} position={'right'}>
            <LinkToExplorer
              value={prettyTx(item.address)}
              chainId={item.chainId}
            />
          </Tooltip>
        </div>
        <div className="hidden lg:block flex-col flex-1 truncate">Viewing</div>
        <div className="hidden lg:block flex-col flex-1 truncate">-</div>
        <div className="flex-col flex-3 flex-initial sm:w-96">
          <div className="sm:flex items-center sm:text-left text-center justify-between relative w-full">
            <button
              type="button"
              onClick={toggleActions}
              className={
                isActionVisible
                  ? 'btn-toggle-action block sm:hidden ml-auto p-0 rotate-90 transform bg-light bg-opacity-10 rounded'
                  : 'btn-toggle-action block sm:hidden ml-auto p-0'
              }
            >
              <img className="w-6" src={iconActions} alt="actions" />
            </button>
            <div
              className={
                !isActionVisible
                  ? 'hidden sm:flex justify-between relative w-full'
                  : 'bg-dark px-6 py-4 border -top-1 rounded-lg absolute sm:p-0 sm:justify-between sm:w-full sm:border-0 sm:bg-opacity-0 sm:flex sm:relative right-8 sm:right-auto sm:-top-0'
              }
            >
              <div
                className={cn(
                  item.status === 'pending_for_approval'
                    ? 'text-green'
                    : 'text-red',
                  'px-0 sm:mr-4 whitespace-nowrap flex items-center',
                )}
              >
                {item.status === 'pending_for_approval'
                  ? 'Add Account'
                  : 'Remove Account'}
              </div>
              <div className="sm:flex items-center justify-end">
                {/*
                  TODO - after confirmation we need to hide buttons (Dismiss and confirm) and show pending status
                */}
                {/* <p className="text-light text-opacity-50">Pending</p> */}

                {/*
                  TODO - after removing we show cancel button
                */}
                {/* <div className="flex-1 flex justify-end items-center">
                  {['pending_for_removal'].includes(item.status) && (
                    <div className="btn-toggler__wrapper">
                      <button
                        className="rounded p-0 hover:bg-light hover:bg-opacity-10 flex text-xs pr-2 items-center"
                        type="button"
                      >
                        <IconUndo className="w-4 h-4 mr-1" /> Cancel
                      </button>
                    </div>
                  )}
                </div> */}
                <Button
                  text="Dismiss"
                  className="text-yellow tracking-normal hover:text-gold hover:underline mr-2 xl:mr-6 px-0 mb-3 sm:mb-0 font-normal"
                />
                <Button
                  text="confirm"
                  primary
                  className="w-full"
                  onClick={toggleDialog}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={open}
        className="dialog--container__confirmation"
        onClose={() => setOpen(false)}
      >
        <div className="text-left">
          <p className="text-md mb-4">
            Are you sure you want to approve{' '}
            {item.status === 'pending_for_approval' ? 'adding' : 'removing'}
            <br />
            this account?
          </p>
          <div>
            <p className="text-xs mb-2">
              <span className="opacity-50">Account Name:</span> {item.name}
            </p>
            <p className="text-xs mb-2">
              <span className="opacity-50">Network:</span> RSK
            </p>
            <p className="text-xs">
              <span className="opacity-50">Account Address:</span>{' '}
              {item.address}
            </p>
          </div>
          <div className="flex items-center justify-end mt-10">
            <Button
              text="Cancel"
              className="text-yellow tracking-normal hover:text-gold hover:underline mr-2 xl:mr-6 px-0 mb-3 sm:mb-0 font-normal"
              onClick={() => setOpen(false)}
            />
            <Button
              text={
                item.status === 'pending_for_approval'
                  ? 'Add Account'
                  : 'Remove Account'
              }
              primary
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
