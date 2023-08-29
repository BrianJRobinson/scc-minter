import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Limelight, Archivo_Black, Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { nftDropContractAddress } from "../consts/contractAddresses";

const limelight = Limelight({
  subsets: ['latin'],
  weight: '400',
})

const archivo_black = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
})

let activeChain:string = "polygon"

// This is the chain your dApp will work on.
// not picking up in Prod ???
if (nftDropContractAddress.toString() !== "0x70ba609b37c0f95821ab96244b66606295e3909a")
  activeChain = "mumbai";

console.log(`Active chain is ${activeChain}`);
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <main className={limelight.className}>
        <ThirdwebProvider 
          activeChain={activeChain} 
          clientId="1e7d03743110f17cf749d48fb8d1962f">
          <Component {...pageProps} />
          <ToastContainer />
        </ThirdwebProvider>
    </main>
  );
}

export default MyApp;
