import {
  AuthClient,
  AuthClientCreateOptions,
  AuthClientLoginOptions,
} from '@dfinity/auth-client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { canisterId, createActor } from '../declarations/backend';
import { ActorSubclass, Identity } from '@dfinity/agent'; // Tambahan untuk memperjelas tipe actor
import { Principal } from '@dfinity/principal';

// Tipe untuk Opsi Auth
interface AuthOptions {
  createOptions?: AuthClientCreateOptions;
  loginOptions?: AuthClientLoginOptions;
}

// Tipe untuk nilai konteks otentikasi
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  authClient: AuthClient | null;
  identity: Identity | null;
  principal: Principal | null;
  whoamiActor: ActorSubclass<any> | null;
}

// Tipe untuk provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Membuat konteks otentikasi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fungsi untuk mendapatkan Identity Provider berdasarkan lingkungan
export const getIdentityProvider = (): string | undefined => {
  let idpProvider: string | undefined;
  if (typeof window !== 'undefined') {
    const isLocal = process.env.DFX_NETWORK !== 'ic';
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isLocal && isSafari) {
      idpProvider = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
    } else if (isLocal) {
      idpProvider = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
    }
  }
  return idpProvider;
};

// Opsi default untuk AuthClient
export const defaultOptions: AuthOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider: getIdentityProvider(),
  },
};

// Hook untuk menggunakan AuthClient
export const useAuthClient = (
  options: AuthOptions = defaultOptions,
): AuthContextType => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<any> | null>(
    null,
  );

  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      await updateClient(client);
    });
  }, []);

  const login = () => {
    if (!authClient) return;
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client: AuthClient) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setWhoamiActor(actor);

    if (isAuthenticated) {
      console.log('Login Successful!');
    }
  }

  async function logout() {
    if (authClient) {
      await authClient.logout();
      await updateClient(authClient);
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
  };
};

// Provider untuk AuthContext
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Hook untuk menggunakan AuthContext dengan keamanan tipe
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
