import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Archivo, Archivo_Black, Poppins } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  weight: '400',
})

const archivo_black = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
})

// This is the chain your dApp will work on.
const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={archivo_black.className}>
      <ThirdwebProvider activeChain={activeChain}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </main>
  );
}

export default MyApp;
