import { useAuth } from '../utility/use-auth-client';
import { Unlink } from 'lucide-react';

function LoggedOut() {
  const { login } = useAuth();

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(67deg, #ddddff 0%, #5151fa 100%)' }}
    >
      <div className="rounded-lg max-w-lg bg-white p-10 shadow-xl dark:bg-gray-800 transition-all ease-in-out duration-300 ">
        <div className="flex justify-center mb-6">
          <Unlink className="w-20 h-20 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-blue-500 text-center">
          Welcome to Unchained
        </h1>
        <p className="mb-8 text-lg text-blue-400 text-center">
          Please Login First!
        </p>
        <button
          type="button"
          id="loginButton"
          onClick={login}
          className="w-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-6 py-3 font-bold text-white transition-all duration-150 transform active:scale-95 hover:bg-gradient-to-br focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Connect
        </button>
        <p className="mt-4 text-sm text-blue-400 text-center">
          Secure, transparent, and unforgettable experiences await!
        </p>
      </div>
    </div>
  );
}

export default LoggedOut;
