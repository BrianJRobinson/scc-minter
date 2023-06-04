import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Limelight, Archivo_Black, Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const limelight = Limelight({
  subsets: ['latin'],
  weight: '400',
})

const archivo_black = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
})

// This is the chain your dApp will work on.
// not picking up in Prod ???
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={limelight.className}>

        <ThirdwebProvider activeChain={activeChain}>
          <Component {...pageProps} />
            <ToastContainer />
        </ThirdwebProvider>
    </main>
  );
}

export default MyApp;
