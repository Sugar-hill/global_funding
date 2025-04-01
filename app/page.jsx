'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useStateContext } from '../context';
import { useEffect, useState } from 'react';

const Home = () => {
  const { isConnected } = useAccount();
  // const { getUserContributions } = useStateContext();
  const [userInvestments, setUserInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (isConnected) {
        // const investments = await getUserContributions();
        // setUserInvestments(investments);
        setUserInvestments([
          { name: 'Government Treasury Bonds', assetType: 'Bond' },
          { name: 'Corporate Bonds Portfolio', assetType: 'Bond' },
          { name: 'Municipal Bonds Fund', assetType: 'Bond' },
          { name: 'High-Yield Corporate Bonds', assetType: 'Bond' },
          { name: 'Bond 5', assetType: 'Bond' },
        ]);
      }
    };
    fetchInvestments();
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] sticky top-0">
      {/* Navigation */}
      <nav className="flex justify-end p-4 bg-[#0a0a0a]">
        <ConnectButton />
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-8 bg-[#000000] rounded-3xl">
            {/* Hero Section */}
            <div className="p-4 relative">
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-[#5eead4] to-[#042f2e] text-transparent bg-clip-text">UNLOCK THE</span>
                <br />
                <span className="bg-gradient-to-r from-[#042f2e] via-[#ffffff] to-[#a7f3d0] text-transparent bg-clip-text">FUTURE OF</span> <span className="text-[#8b5cf6]">BONDS</span>
                <br />
                <span className="bg-gradient-to-r from-[#5eead4] to-[#042f2e] text-transparent bg-clip-text"> &</span>
                <span className="text-[#8b5cf6]"> REAL ESTATE </span> 
                <span className="bg-gradient-to-r from-[#042f2e] via-[#5eead4] to-white text-transparent bg-clip-text">WITH WEB3</span>
                <span className="bg-gradient-to-r from-[#5eead4] to-[#042f2e] text-transparent bg-clip-text">.</span>
              </h1>
              <hr className="border-t border-gray-300 my-4" />
              <br />
              <br />
              <img 
                src="/assets/images/homepic.png" 
                alt="home" 
                className="w-full h-[300px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-8">
            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
             
              <Link href="/bonds" className="block">
                <div className="bg-[#115e59] text-white p-8 rounded-3xl h-[440px] flex flex-col justify-between transition-transform hover:scale-[1.02]">
                  <div>
                    <div className="mb-4">
                      <span className="text-sm uppercase tracking-wide bg-white/20 px-4 py-1 rounded-full">Bonds</span>
                    </div>
                    <h2 className="text-3xl font-bold">
                      Digital Bonds:<br />
                      Invest in the<br />
                      future of finance
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="hover:underline">VIEW ALL BONDS</button>
                    <span className="bg-white/20 px-3 py-1 rounded-full">8</span>
                  </div>
                </div>
              </Link>

              {/* Latest Articles Card */}
              <Link href="/estates" className="block">
                <div className="bg-purple-200 p-8 rounded-3xl h-[440px] flex flex-col justify-between transition-transform hover:scale-[1.02]">
                  <div>
                    <div className="mb-4">
                      <span className="text-sm uppercase tracking-wide bg-black/10 px-4 py-1 rounded-full">estates</span>
                    </div>
                    <h2 className="text-3xl font-bold">
                      Real Estate:<br />
                      Tokenized<br />
                      properties
                    </h2>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="hover:underline">VIEW ALL ESTATES</button>
                    <span className="bg-black/10 px-3 py-1 rounded-full">13</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Web3 Logo */}
            <Link href="/profile" className="block">
              <div className="bg-black p-8 rounded-3xl transition-transform hover:scale-[1.02]">
                <div className="flex flex-col gap-4">
                  <div className="text-white text-xl font-bold mb-4">
                    Your Investments
                  </div>
                  {!isConnected ? (
                    <div className="text-gray-400 text-center py-8">
                      Connect wallet to see your investments
                    </div>
                  ) : userInvestments.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">
                      No investments
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {userInvestments.slice(0, 3).map((investment, index) => (
                        <div key={index} className="flex justify-between items-center text-white">
                          <span className="truncate">{investment.name}</span>
                          <span className="text-gray-400">{investment.assetType}</span>
                        </div>
                      ))}
                      {userInvestments.length > 3 && (
                        <div className="text-gray-400 text-center pt-2">
                          +{userInvestments.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;