import React from 'react';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { ViewableAccount } from '../ViewableAccounts/types';
import { MonitoringAccount } from '../MonitoringAccounts/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  item: ViewableAccount | MonitoringAccount;
}

export function RemoveAccountDialog(props: Props) {
  const cancel = () => {
    props.onClose();
  };

  const confirm = () => {
    props.onRemove();
    props.onClose();
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      className="dialog--container__confirmation"
      onClose={() => props.onClose()}
    >
      <div className="text-left">
        <p className="text-md mb-4">
          Are you sure you want to remove this account:
        </p>
        <div>
          <p className="text-xs mb-2">
            <span className="opacity-50">Account Name:</span>{' '}
            {props.item.walletName}
          </p>
          <p className="text-xs mb-2">
            <span className="opacity-50">Network:</span> {props.item.chainId}
          </p>
          <p className="text-xs">
            <span className="opacity-50">Account Address:</span>{' '}
            {props.item.address}
          </p>
        </div>
        <div className="flex items-center justify-end mt-10">
          <Button
            text="Cancel"
            className="text-yellow tracking-normal hover:text-gold hover:underline mr-2 xl:mr-6 px-0 mb-3 sm:mb-0 font-normal"
            onClick={() => cancel()}
          />
          <Button text="Remove" onClick={() => confirm()} primary />
        </div>
      </div>
    </Dialog>
  );
}
