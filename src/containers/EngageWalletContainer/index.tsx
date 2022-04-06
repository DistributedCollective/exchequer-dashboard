import React, { useContext, useEffect } from 'react';
import { WalletProvider, WalletContext } from '@sovryn/react-wallet';
import cn from 'classnames';
import { useAuthContext } from '../AuthContainer';
import { Button } from '../../components/Button';
import { prettyTx } from '../../utils/helpers';
import { httpClient } from '../../utils/http-client';

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
    auth.updateRole('viewer');
    // only run effect if wallet.address changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.address]);

  useEffect(() => {
    if (wallet.wallet?.getAddressString()) {
      const sign = async () => {
        const date = new Date().toUTCString();
        const message = `Login to backend on ${date}`;
        const signature = await wallet.signMessage(
          `Login to backend on ${date}`,
        );
        const { token } = await httpClient.post<{ token: string }>(
          'user/auth',
          {
            signedMessage: signature,
            message: message,
            walletAddress: wallet.address,
          },
        );
        httpClient.setAccessToken(token);
        auth.updateRole('signer');
      };

      sign().catch(() => {
        auth.updateRole('viewer');
        httpClient.setAccessToken(null);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, wallet.address]);

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
        <div className="container relative flex items-center justify-center h-screen">
          <div id="wallet-connection-target" />
        </div>
      </div>
    </>
  );
}
