import '@styles/globals.css';

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
            </main>
        </body>
    </html>
  
  )
}  

export default RootLayout;