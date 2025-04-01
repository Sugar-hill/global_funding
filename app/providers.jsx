'use client';

import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { StateContextProvider } from '@/context';

const config = getDefaultConfig({
  appName: 'Global Funding',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
  chains: [mainnet, sepolia],
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#322543', // Your custom primary color
            accentColorForeground: 'white', // Text color that shows on top of accent color
            borderRadius: 'medium',
            fontStack: 'system'
          })}
          // Optional: customize the modal layout
          modalSize="compact"
        >
          <StateContextProvider>
            {children}
          </StateContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}