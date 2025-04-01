'use client';
import React, { useContext, createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { walletClientToSigner } from '@/utils/wallet';
import { TokenizedAssets } from '@/contracts/TokenizedAssets';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize contract when wallet client is available
  useEffect(() => {
    const initContract = async () => {
      if (walletClient && isConnected) {
        try {
          const signer = await walletClientToSigner(walletClient);
          const contractInstance = new ethers.Contract(TokenizedAssets.address, TokenizedAssets.abi, signer);
          setContract(contractInstance);
        } catch (err) {
          console.error('Error initializing contract:', err);
          setError('Failed to initialize contract');
        }
      }
    };

    initContract();
  }, [walletClient, isConnected]);

  // Asset Type enum
  const AssetType = {
    REIT: 0,
    BOND: 1
  };

  // Create a new REIT
  const createREIT = async (form) => {
    if (!contract || !address) return;
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contract.createREIT(
        address,
        form.companyName,
        form.description,
        ethers.utils.parseUnits(form.amount, 'ether'), // Assuming USDT has 18 decimals like ETH
        form.monthlyRentEstimate,
        new Date(form.deadline).getTime() / 1000, // Convert to Unix timestamp
        form.images
      );
      
      await tx.wait();
      setLoading(false);
      return tx;
    } catch (error) {
      console.error('Error creating REIT:', error);
      setError(error.message || 'Error creating REIT');
      setLoading(false);
      throw error;
    }
  };

  // Create a new Bond
  const createBond = async (form) => {
    if (!contract || !address) return;
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contract.createBond(
        address,
        form.bondName,
        form.description,
        ethers.utils.parseUnits(form.amount, 'ether'),
        form.period, // Maturity period in days
        form.valuationPercentage, // Interest rate in basis points (e.g. 500 = 5%)
        new Date(form.deadline).getTime() / 1000, // Convert to Unix timestamp
        form.image
      );
      
      await tx.wait();
      setLoading(false);
      return tx;
    } catch (error) {
      console.error('Error creating Bond:', error);
      setError(error.message || 'Error creating Bond');
      setLoading(false);
      throw error;
    }
  };

  // Contribute to an asset
  const contributeToAsset = async (assetId, amount) => {
    if (!contract || !address) return;
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contract.contribute(
        assetId,
        ethers.utils.parseUnits(amount, 'ether')
      );
      
      await tx.wait();
      setLoading(false);
      return tx;
    } catch (error) {
      console.error('Error contributing to asset:', error);
      setError(error.message || 'Error contributing to asset');
      setLoading(false);
      throw error;
    }
  };

  // Close asset for contributions
  const closeAsset = async (assetId) => {
    if (!contract || !address) return;
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contract.closeAsset(assetId);
      await tx.wait();
      setLoading(false);
      return tx;
    } catch (error) {
      console.error('Error closing asset:', error);
      setError(error.message || 'Error closing asset');
      setLoading(false);
      throw error;
    }
  };

  // Distribute payments to NFT holders
  const distributePayments = async (assetId, amount) => {
    if (!contract || !address) return;
    setLoading(true);
    setError(null);
    
    try {
      const tx = await contract.distributePayments(
        assetId,
        ethers.utils.parseUnits(amount, 'ether')
      );
      
      await tx.wait();
      setLoading(false);
      return tx;
    } catch (error) {
      console.error('Error distributing payments:', error);
      setError(error.message || 'Error distributing payments');
      setLoading(false);
      throw error;
    }
  };

  // Get all assets
  const getAssets = async () => {
    if (!contract) return [];
    
    try {
      const assetCount = await contract._assetIds();
      const assets = [];
      
      for (let i = 0; i < assetCount; i++) {
        const basicDetails = await contract.getAssetDetails(i);
        
        let assetDetails;
        if (basicDetails.assetType === AssetType.REIT) {
          const reitDetails = await contract.getREITDetails(i);
          assetDetails = {
            monthlyRentEstimate: reitDetails.monthlyRentEstimate.toString(),
            images: reitDetails.images
          };
        } else {
          const bondDetails = await contract.getBondDetails(i);
          assetDetails = {
            period: bondDetails.period.toString(),
            valuationPercentage: bondDetails.valuationPercentage.toString(),
            image: bondDetails.image
          };
        }
        
        assets.push({
          id: i,
          owner: basicDetails.owner,
          name: basicDetails.name,
          description: basicDetails.description,
          targetAmount: ethers.utils.formatEther(basicDetails.targetAmount),
          amountCollected: ethers.utils.formatEther(basicDetails.amountCollected),
          deadline: new Date(basicDetails.deadline.toNumber() * 1000),
          isClosed: basicDetails.isClosed,
          assetType: basicDetails.assetType === AssetType.REIT ? 'REIT' : 'BOND',
          ...assetDetails
        });
      }
      
      return assets;
    } catch (error) {
      console.error('Error fetching assets:', error);
      return [];
    }
  };

  // Get asset contributors and their contributions
  const getContributions = async (assetId) => {
    if (!contract) return { contributors: [], amounts: [] };
    
    try {
      const result = await contract.getContributions(assetId);
      
      return {
        contributors: result[0],
        amounts: result[1].map(amount => ethers.utils.formatEther(amount))
      };
    } catch (error) {
      console.error('Error fetching contributions:', error);
      return { contributors: [], amounts: [] };
    }
  };

  // Calculate bond returns for contributors
  const getBondReturns = async (assetId) => {
    if (!contract) return { contributors: [], returns: [] };
    
    try {
      const result = await contract.getBondReturns(assetId);
      
      return {
        contributors: result[0],
        returns: result[1].map(amount => ethers.utils.formatEther(amount))
      };
    } catch (error) {
      console.error('Error fetching bond returns:', error);
      return { contributors: [], returns: [] };
    }
  };

  // Get assets contributed to by the current user
  const getUserContributions = async () => {
    if (!contract || !address) return [];
    
    try {
      const assetIds = await contract.getContributorAssets(address);
      const userAssets = [];
      
      for (let i = 0; i < assetIds.length; i++) {
        const assetId = assetIds[i].toNumber();
        const basicDetails = await contract.getAssetDetails(assetId);
        const percentage = await contract.getContributionPercentage(assetId, address);
        
        let assetDetails;
        if (basicDetails.assetType === AssetType.REIT) {
          const reitDetails = await contract.getREITDetails(assetId);
          assetDetails = {
            monthlyRentEstimate: reitDetails.monthlyRentEstimate.toString(),
            images: reitDetails.images
          };
        } else {
          const bondDetails = await contract.getBondDetails(assetId);
          assetDetails = {
            period: bondDetails.period.toString(),
            valuationPercentage: bondDetails.valuationPercentage.toString(),
            image: bondDetails.image
          };
        }
        
        userAssets.push({
          id: assetId,
          owner: basicDetails.owner,
          name: basicDetails.name,
          description: basicDetails.description,
          targetAmount: ethers.utils.formatEther(basicDetails.targetAmount),
          amountCollected: ethers.utils.formatEther(basicDetails.amountCollected),
          deadline: new Date(basicDetails.deadline.toNumber() * 1000),
          isClosed: basicDetails.isClosed,
          assetType: basicDetails.assetType === AssetType.REIT ? 'REIT' : 'BOND',
          contributionPercentage: percentage.toNumber() / 100, // Convert basis points to percentage
          ...assetDetails
        });
      }
      
      return userAssets;
    } catch (error) {
      console.error('Error fetching user contributions:', error);
      return [];
    }
  };

  // Calculate bond return for a specific user
  const calculateUserBondReturn = async (assetId) => {
    if (!contract || !address) return '0';
    
    try {
      const returnAmount = await contract.calculateBondReturn(assetId, address);
      return ethers.utils.formatEther(returnAmount);
    } catch (error) {
      console.error('Error calculating bond return:', error);
      return '0';
    }
  };

  return (
    <StateContext.Provider 
      value={{
        // State
        address,
        isConnected,
        loading,
        error,
        
        // Asset Type enum
        AssetType,
        
        // REIT functions
        createREIT,
        
        // Bond functions
        createBond,
        calculateUserBondReturn,
        getBondReturns,
        
        // General asset functions
        contributeToAsset,
        closeAsset,
        distributePayments,
        getAssets,
        getContributions,
        getUserContributions
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);