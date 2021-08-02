import React, { useState, useCallback } from 'react';
import { Button } from '../Button';
import iconClose from '../../assets/icon-close.svg';
import { Dialog } from '../Dialog';

//todo
//update props
interface InformProps {
  onClose?: () => void;
  accountName: string;
  accountAddress: string;
}

export function MonitoringAccountInform(props: InformProps) {
  const [visible, setVisible] = useState(true);
  const closeInform = useCallback(() => {
    setVisible(prevState => !prevState);
  }, []);
  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => {
    setOpen(prevState => !prevState);
  }, []);
  const approveAccount = useCallback(() => {
    setOpen(false);
    setVisible(false);
  }, []);
  const agaistAccount = useCallback(() => {
    setOpen(false);
    setVisible(false);
  }, []);
  return (
    <>
      {visible && (
        <div className="container">
          <div className="rounded-lg border border-light mt-10 p-5 relative bg-light bg-opacity-5">
            <Button
              className="p-1 w-6 absolute right-3 top-3"
              title="Close"
              text={<img src={iconClose} alt="close" />}
              onClick={closeInform}
            />
            <h3 className="text-xl font-semibold leading-6 mb-6 pr-4 sm:pr-0">
              New Account Has Been Added
            </h3>
            <p className="mb-3">XXXXXXXXX add an account named:</p>
            <ul>
              <li>- {props.accountName}</li>
              <li className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                - {props.accountAddress}
              </li>
            </ul>
            <Button
              text="Approve"
              primary
              className="mt-8 w-full sm:w-auto"
              onClick={toggleDialog}
            />
          </div>

          <Dialog isOpen={open} onClose={() => setOpen(false)}>
            <div className="text-center">
              <span>Approve account</span>
              <div className="flex items-center justify-center mt-10">
                <Button
                  text="Approve"
                  className="mr-3"
                  primary
                  onClick={approveAccount}
                />
                <Button
                  text="Agains"
                  className="mr-3"
                  primary
                  onClick={agaistAccount}
                />
                <Button text="Close" primary onClick={() => setOpen(false)} />
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
