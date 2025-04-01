import { useContractRead, useContractWrite, useSendTransaction } from 'wagmi';
import { TokenizedAssets } from '@/contracts/TokenizedAssets';

export function useGlobalFundingContract() {
  const contract = {
    address: TokenizedAssets.address,
    abi: TokenizedAssets.abi,
  };

  return {
    contract,
    useContractRead,
    useContractWrite,
    useSendTransaction,
  };
} 