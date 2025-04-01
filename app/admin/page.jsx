'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const AdminDashboard = () => {
  const [balance, setBalance] = useState('3,520.10'); // Example balance
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <ConnectButton />
        </div>

        {isConnected ? (
          <>
            <div className="mb-8">
              <h2 className="text-gray-400 text-sm mb-2">Platform Balance</h2>
              <div className="flex items-baseline">
                <span className="text-3xl font-semibold text-gray-200">$</span>
                <span className="text-4xl font-bold text-white">{balance}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Link 
                href="/admin/create-estate"
                className="flex flex-col items-center p-4 bg-gray-700 rounded-xl border border-gray-600 hover:bg-gray-600 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-200">Create Estate</span>
              </Link>

              <Link 
                href="/admin/create-bond"
                className="flex flex-col items-center p-4 bg-gray-700 rounded-xl border border-gray-600 hover:bg-gray-600 transition-colors"
              >
                <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-200">Create Bond</span>
              </Link>

              <Link 
                href="/admin/distribute-funds"
                className="flex flex-col items-center p-4 bg-gray-700 rounded-xl border border-gray-600 hover:bg-gray-600 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-200">Distribute Funds</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">Please connect your wallet to access admin features</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
