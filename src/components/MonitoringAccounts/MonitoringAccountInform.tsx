import React, { useState } from 'react';
import { Button } from '../Button';
import iconClose from '../../assets/icon-close.svg';

//todo
//update props
interface InformProps {
  onClose?: () => void;
  accountName: string;
  accountAddress: string;
}

export function MonitoringAccountInform(props: InformProps) {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && (
        <div className="container">
          <div className="rounded-lg border border-light mt-10 p-5 relative bg-light bg-opacity-5">
            <Button
              className="p-1 w-6 absolute right-3 top-3"
              title="Close"
              text={<img src={iconClose} alt="close" />}
              onClick={() => setVisible(false)}
            />
            <h3 className="text-xl font-semibold leading-6 mb-6">
              New Account Has Been Added
            </h3>
            <p className="mb-3">XXXXXXXXX add an account named:</p>
            <ul>
              <li>- {props.accountName}</li>
              <li>- {props.accountAddress}</li>
            </ul>
            <Button
              text="Approve"
              primary
              className="mt-8"
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
