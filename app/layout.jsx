import '@styles/globals.css';
import Nav from '@components/navbar';

export const metadata = {
    title: 'NFT Funded',
    description: 'Donations decentralized platform',
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <main className="bg-slate-500 min-h-screen">
                {children}
                <Nav />
            </main>
        </body>
    </html>
  
  )
}  

export default RootLayout;