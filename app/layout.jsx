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
            <main>
                {children}
                <Nav />
            </main>
        </body>
    </html>
  
  )
}  

export default RootLayout;