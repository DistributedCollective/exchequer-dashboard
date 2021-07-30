import React, { useContext, useEffect } from 'react';
import { WalletProvider, WalletContext } from '@sovryn/react-wallet';
import cn from 'classnames';
import { useAuthContext } from '../AuthContainer';
import { Button } from '../../components/Button';
import { prettyTx } from '../../utils/helpers';

export const EngageWalletContainer = () => (
  <WalletProvider
    options={{ chainId: 30, remember: true }}
    portalTargetId="wallet-connection-target"
  >
    <WalletConsumer />
  </WalletProvider>
);

function WalletConsumer() {
  const auth = useAuthContext();
  const { connect, disconnect, wallet, connected, connecting } =
    useContext(WalletContext);

  useEffect(() => {
    auth.updateWallet(wallet);
    // only run effect if wallet.address changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.address]);

  return (
    <>
      {!connected ? (
        <Button primary text="Engage Wallet" onClick={connect} />
      ) : (
        <div className="flex flex-row space-x-4 justify-end items-center">
          <div>{prettyTx(wallet.address)}</div>
          <Button
            text="Disconnect"
            onClick={disconnect}
            secondary
            className="border-0"
          />
        </div>
      )}
      <div className={cn('dialog-wrapper', connecting ? 'block' : 'hidden')}>
        <div className="dialog--backdrop" />
        <div className="container relative">
          <div id="wallet-connection-target" />
        </div>
      </div>
    </>
  );
}
