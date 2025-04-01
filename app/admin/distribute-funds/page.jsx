'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useStateContext } from '@/context';

const DistributeFunds = () => {
  const { isConnected } = useAccount();
  const { loading, error, distributePayments } = useStateContext();
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    assetId: '',
    amount: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const tx = await distributePayments(formData.assetId, formData.amount);
      if (tx) {
        alert('Funds distributed successfully!');
        setFormData({ assetId: '', amount: '' });
      }
    } catch (error) {
      console.error('Error distributing funds:', error);
      alert(error.message || 'Failed to distribute funds. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-700" />
              <h1 className="text-xl font-bold text-white">Distribute Funds</h1>
            </div>
            <div className="w-[180px] h-[40px] bg-gray-700 rounded-lg" />
          </div>
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-white">Distribute Funds</h1>
          </div>
          <ConnectButton />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {isConnected ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="assetId" className="block text-sm font-medium text-gray-300 mb-2">
                Asset ID
              </label>
              <input
                type="number"
                id="assetId"
                name="assetId"
                value={formData.assetId}
                onChange={handleInputChange}
                placeholder="Enter Asset ID"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                Amount to Distribute (ETH)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.0"
                step="0.0001"
                min="0"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Distribution Summary</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex justify-between">
                  <span>Asset ID:</span>
                  <span className="text-gray-300">{formData.assetId || '---'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Amount to Distribute:</span>
                  <span className="text-gray-300">{formData.amount ? `${formData.amount} ETH` : '---'}</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={!isConnected || loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isConnected && !loading
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Processing...' : 'Distribute Funds'}
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">Please connect your wallet to distribute funds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributeFunds; 