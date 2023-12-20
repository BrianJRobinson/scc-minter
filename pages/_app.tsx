import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Limelight, Archivo_Black, Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { nftDropContractAddress } from "../consts/contractAddresses";
import { Box, ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import  Header from "../components/Header";

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
if (nftDropContractAddress.toString() !== "0x49a5BC3414935f74e4d23c8715f00a9B3a77f291")
  activeChain = "mumbai";

console.log(`Active chain is ${activeChain}`);
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <main className={limelight.className}>
        <ChakraProvider>
          <ThirdwebProvider 
            activeChain={activeChain} 
            clientId="1e7d03743110f17cf749d48fb8d1962f">
            <Flex flexDirection={'column'} minH={'100vh'} minW={('100vw')} alignItems={'stretch'} >
              <Header />  
              <Box backgroundColor={"#fc5"} maxH={"5px"} minH={"5px"}/>        
              <Component {...pageProps}/>
            </Flex>
            <ToastContainer />
          </ThirdwebProvider>
        </ChakraProvider>
    </main>
  );
}

export default MyApp;
