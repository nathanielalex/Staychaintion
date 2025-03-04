import React, { useState, useEffect } from 'react';
import { backend } from '../utility/backend';
import { toast } from 'react-toastify';
import { Principal } from '@dfinity/principal';
import { Button } from './ui/button';

// Menentukan tipe untuk `window.ic.plug`
interface PlugWallet {
  isConnected: () => Promise<boolean>;
  requestConnect: (options: {
    whitelist: string[];
    host: string;
  }) => Promise<boolean>;
  disconnect: () => Promise<void>;
  agent?: {
    getPrincipal: () => Promise<{ toString: () => string }>;
  };
}

// Menentukan tipe untuk `window.ic`
declare global {
  interface Window {
    ic?: {
      plug?: PlugWallet;
    };
  }
}

const ConnectWallet: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const whitelist: string[] = [
    process.env.CANISTER_ID_FRONTEND || '',
    process.env.CANISTER_ID_BACKEND || '',
  ]; // Whitelist both canisters

  const host: string = 'http://localhost:4943'; // For local development

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async (): Promise<void> => {
    try {
      const isConnected = await window.ic?.plug?.isConnected();
      setConnected(!!isConnected);

      if (isConnected) {
        const principal = await window.ic?.plug?.agent?.getPrincipal();
        setPrincipalId(principal?.toString() || '');
      }
    } catch (e) {
      toast.error('Error checking connection status', {
        position: 'top-center',
      });
      console.error(e);
    }
  };

  const connectPlug = async (): Promise<void> => {
    try {
      if (!window.ic?.plug) {
        toast.error(
          'Plug Wallet is not installed. Please install it to continue.',
          {
            position: 'top-center',
          },
        );
        window.open('https://plugwallet.ooo/', '_blank');
        return;
      }

      const result = await window.ic.plug.requestConnect({ whitelist, host });

      if (result) {
        const principal = await window.ic.plug.agent?.getPrincipal();
        setPrincipalId(principal?.toString() || '');
        setConnected(true);
        await getBalance();
      }
    } catch (e) {
      toast.error('Error connecting to Plug Wallet', {
        position: 'top-center',
        style: { fontSize: '12px' },
      });
      console.error(e);
    }
  };

  const disconnectPlug = async (): Promise<void> => {
    try {
      await window.ic?.plug?.disconnect();
      
      setConnected(false);
      setPrincipalId(null);
    } catch (e) {
      toast.error('Error disconnecting from Plug Wallet', {
        position: 'top-center',
      });
      console.error(e);
    }
  };

  const getBalance = async (): Promise<void> => {
    try {
      setLoading(true);
      const principalStr = await window.ic?.plug?.agent?.getPrincipal();
      if (!principalStr) throw new Error('No principal found');

      console.log('Principal:', principalStr.toString());

      // Konversi string principal ke tipe Principal
      const principal = Principal.fromText(principalStr.toString());

      const balance = await backend.checkBalance(principal);
      console.log('Balance:', balance);

      setBalance(Number(balance));
    } catch (e) {
      toast.error('Error fetching balance', {
        position: 'top-center',
      });
      console.error('Error fetching balance:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {!connected ? (
        <Button
          onClick={connectPlug}
        >
          Connect to Plug Wallet
        </Button>
      ) : (
        <div>
          <div className="mb-4">
            <p className="font-bold">Connected Principal ID:</p>
            <p className="break-all">{principalId || 'Unknown'}</p>
            <div className="mb-4">
              <p className="font-bold">Current Balance:</p>
              <p className="text-2xl">{loading ? 'Loading...' : balance}</p>
            </div>
          </div>
          <button
            onClick={disconnectPlug}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
