// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../utility/use-auth-client';
// import { Button } from '../components/ui/button';
// import ConnectWallet from '@/components/ConnectWallet';

// const HomePage = () => {
//   const { whoamiActor, logout } = useAuth();
//   const navigate = useNavigate();

//   const [result, setResult] = React.useState('');

//   const handleClick = async () => {
//     // console.log("test");
//     // console.log(whoamiActor);
//     if (whoamiActor) {
//       try {
//         const whoami = await whoamiActor.whoami();
//         setResult(whoami);
//       } catch (error) {
//         console.error('Error calling whoami:', error);
//       }
//     } else {
//       console.error('whoamiActor is not defined');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
//       <button
//         id="logout"
//         onClick={logout}
//         className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//       >
//         log out
//       </button>
//       <div className="flex items-center justify-center gap-4 mt-4">
//         <Button
//           type="button"
//           id="whoamiButton"
//           className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           onClick={handleClick}
//         >
//           Who am I?
//         </Button>
//         <input
//           type="text"
//           readOnly
//           id="whoami"
//           value={result}
//           placeholder="your Identity"
//           className="border border-solid border-black"
//         />
//       </div>
//       <ConnectWallet />
//     </div>
//   );
// };

// export default HomePage;


"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, Wallet, User, Loader2 } from "lucide-react"
import { SparklesCore } from "@/components/landing/sparkles"

import ConnectWallet from '@/components/ConnectWallet';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utility/use-auth-client';

export default function WhoAmIPage() {
  
  const { whoamiActor, logout } = useAuth();
  const navigate = useNavigate();

  const [result, setResult] = React.useState('');

  // const [isConnecting, setIsConnecting] = useState(false)
  // const [isConnected, setIsConnected] = useState(false)

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

    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#4285F4"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-blue/[0.02] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mb-12">
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            
            id="logout"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-8">
          {/* Identity Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full space-y-4"
          >
            <div className="flex items-center space-x-4 mb-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-medium text-blue-600">Who am I?</span>
            </div>
            
            <Button
              type="button"
              id="whoamiButton"
              onClick={handleClick}
            >
              Who am I?
            </Button>

              <div className="relative">
                <Input type="text"
                readOnly
                id="whoami"
                value={result}
                placeholder="your Identity"
                className="border border-solid border-black" />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Connect Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >

            {/* Button for Connect Wallet-nya */}

            <ConnectWallet/>

            {/* <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg relative overflow-hidden group"
              // onClick={handleConnect}
              disabled={isConnecting || isConnected}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : isConnected ? (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connected to Plug Wallet
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect to Plug Wallet
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-blue-700"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button> */}

          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl" />
        
      </div>

      {/* Connection Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>Connected to Plug Wallet</span>
        </div>
      </motion.div>
    </main>

  )

}

