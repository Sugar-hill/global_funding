import '@styles/globals.css';
import Nav from '@components/navbar';
import { Providers } from './providers';

export const metadata = {
    title: 'NFT RWA',
    description: 'NFT REAL WORLD ASSETS platform',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <Providers>
                <main className="bg-[#000000]">
                    {children}
                    <Nav />
                </main>
            </Providers>
        </body>
    </html>
  )
}  

export default RootLayout;