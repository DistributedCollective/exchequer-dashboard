import React, { createContext, useCallback, useContext, useState } from 'react';
import type { WalletService } from '@sovryn/wallet';
import '@sovryn/react-wallet/index.css';
import type { UserRole } from '../../utils/types';

type AuthContextState = {
  address: string | null;
  role: UserRole;
  wallet: WalletService;
  stateRefreshed: number;
};

type AuthContextMethods = {
  updateWallet: (wallet: WalletService) => void;
  updateRole: (role: UserRole) => void;
  onStateRefreshed: (date: Date) => void;
};

const defaultState: AuthContextState = {
  address: null,
  role: 'reader',
  wallet: null as any,
  stateRefreshed: Date.now(),
};

export const AuthContext = createContext<AuthContextState & AuthContextMethods>(
  defaultState as AuthContextState & AuthContextMethods,
);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      `useAuthContext hook must be in AuthContext provider scope.`,
    );
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

export function AuthContainer(props: Props) {
  const [state, setState] = useState<AuthContextState>(defaultState);

  const updateWallet = useCallback(async (wallet: WalletService) => {
    setState(prevState => ({ ...prevState, wallet, address: wallet.address }));
  }, []);

  const updateRole = useCallback((role: UserRole) => {
    setState(prevState => ({ ...prevState, role }));
  }, []);

  const onStateRefreshed = useCallback((date: Date) => {
    setState(prevState => ({ ...prevState, stateRefreshed: date.getTime() }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, updateWallet, updateRole, onStateRefreshed }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
