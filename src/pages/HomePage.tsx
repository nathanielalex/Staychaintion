import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utility/use-auth-client';
import { Button } from '../components/ui/button';
import ConnectWallet from '@/components/ConnectWallet';

const HomePage = () => {
  const { whoamiActor, logout } = useAuth();
  const navigate = useNavigate();

  const [result, setResult] = React.useState('');

  const handleClick = async () => {
    // console.log("test");
    // console.log(whoamiActor);
    if (whoamiActor) {
      try {
        const whoami = await whoamiActor.whoami();
        setResult(whoami);
      } catch (error) {
        console.error('Error calling whoami:', error);
      }
    } else {
      console.error('whoamiActor is not defined');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <button
        id="logout"
        onClick={logout}
        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        log out
      </button>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          type="button"
          id="whoamiButton"
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleClick}
        >
          Who am I?
        </Button>
        <input
          type="text"
          readOnly
          id="whoami"
          value={result}
          placeholder="your Identity"
          className="border border-solid border-black"
        />
      </div>
      <ConnectWallet />
    </div>
  );
};

export default HomePage;
