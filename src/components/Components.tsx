import React, { useCallback, useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Dialog } from './Dialog';
import { Identicon } from './Identicon';
import { LinkToExplorer } from './LinkToExplorer';

export function Components() {

  const [open, setOpen] = useState(false);
  const toggleDialog = useCallback(() => {
    setOpen(prevState => !prevState);
  }, []);

  return (
    <div className="container px-24 py-24">
      Buttons:
      <div className="flex space-x-4">
        <Button text="Add Account" />
        <Button text="Add Account" disabled />

        <Button text="Add Account" primary />
        <Button text="Add Account" disabled primary />

        <Button text="Add Account" secondary />
        <Button text="Add Account" disabled secondary/>
      </div>

      Inputs:
      <div className="flex space-x-4">
        <Input placeholder="RSK Account Address" />
        <Input placeholder="RSK Account Address" disabled />
      </div>

      Identicon:
      <div className="flex space-x-4">
        <Identicon value='test' />
        <Identicon value='another test' size='lg' />
      </div>

      Explorer links:

      <div className="flex space-x-4">
        <LinkToExplorer value='0x31bf80b8124FAa7b34F682964873A1472BD057a6' />
        <LinkToExplorer value='0x97115dcca60b07eb52f48076492f3f11bf4babe4c4bd782e980fe58111dc5568' type="tx" />

        <LinkToExplorer value='0xdAC17F958D2ee523a2206206994597C13D831ec7' chainId={1} />
        <LinkToExplorer value='0x3bf1dbcce2a09d22d68f36e7778e52e403e2390910517c22c82a0bb81f855190' type="tx" chainId={1} />
      </div>

      Dialog:
      <div>
        <Button text="Toggle" onClick={toggleDialog} />
        <Dialog isOpen={open} onClose={() => setOpen(false)} >
          <span>Test dialog.</span>
          <div>
            <Button text="Close" secondary onClick={() => setOpen(false)} />
          </div>
        </Dialog>
      </div>
    </div>
  );
}
