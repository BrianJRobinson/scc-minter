import { 
  Web3Button,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  useContractRead
} from "@thirdweb-dev/react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { nftDropContractAddress } from "../consts/contractAddresses";
import { apiAddress } from "../consts/apiAddresses";

import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Leaderboard from "../leaderboard";
import { TimerContainer } from "../components/TimerContainer";
import MintLeaderboard from "../components/MintLeaderboard";
import { Box, Text, Input } from "@chakra-ui/react";
import EngineFunding from "../components/EngineFunding";

const Home: NextPage = () => {
  const router = useRouter()
  const queryParameters = router.query

  const [referral, setReferral] = useState('Engine');
  const [refWallet, setRefWallet] = useState('');
  const [tokenId, setTokenId] = useState('0');
  const [refLink, setRefLink] = useState('');

  console.log(nftDropContractAddress);

  const { contract } = useContract(nftDropContractAddress);
  const address = useAddress();

 
  const { data: nfts, isLoading: isLoading } = useOwnedNFTs(contract, address);
  const nftSize = nfts ? nfts?.length > 20 ? "140px" : "200px" : "200px";

  const { data: totalMinted, isLoading: totalMintedIsLoading } = useContractRead(
    contract,
    "totalMinted"
  );

  const updateReferral = async (team: string, id:string) => {

    if(!team || team == "undefined")
      team = 'Engine';
    let tempWallet = refWallet;
    if (!tempWallet)
      tempWallet = 'Engine';

    if (nftDropContractAddress as string !== "0x49a5BC3414935f74e4d23c8715f00a9B3a77f291") // not prod   
    {
      team = "Test Run";
    }   
    console.log(`Sending a referral update with team "${team}" for tokenId ${id} ref wallet as ${refWallet} and purchaser of ${address}`);    
    const response = await fetch(`${apiAddress}team=${team}&tokenid=${id}&refwallet=${tempWallet}&purchaser=${address}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
 
    await response.text();
    setTokenId(id.toString());
  };

  useEffect(() => {
    if (router.isReady) {
      if(queryParameters.ref as string != "")
        setReferral(queryParameters.ref as string);
      if(queryParameters.wallet as string != "")
        setRefWallet(queryParameters.wallet as string);
    }
  }, [router.isReady])  

  /*
    All The Timer stuff goes here
  */
    const [time, setTime] = useState<number>(1);
    const [newTime, setNewTime] = useState<number>(0)
    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
  
    const timeToDays = time * 60 * 60 * 24 * 1000;
  
    let countDownDate = new Date().getTime() + timeToDays;
  
  
    useEffect(() => {
  
  
      var updateTime = setInterval(() => {
        const now = new Date().getTime();
        var testDate = new Date();
        var currentDay = testDate.getUTCDate();
        var currentMonth = testDate.getUTCMonth();

        var currentYear = testDate.getUTCFullYear();
        //console.log(testDate.toString())
        //console.log(currentDay);
        //console.log(currentMonth);

        if (currentDay > 15)
          currentMonth += 1;

        //console.log(currentMonth);

        const then = Date.UTC(currentYear, currentMonth, 15, 8, 0, 0);
        const difference = then - now;
  
        var newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        var newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        //console.log(difference);
        //console.log(new Date(then).toString());
  
        setDays(newDays);
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
  
  
        if (difference <= 0) {
          clearInterval(updateTime);
          setMessage("Snapshot in Progress");
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
        }
      })
  
      return () => {
        clearInterval(updateTime);
      }
  
    }, [time]);

    // END OF THE TIMER CODE
  return (
    <Box className={styles.main} color={"#fc3"}>
      <div>
        <img src="../images/poops-lounge-bg.jpg" className={styles.mainimg}></img>
      </div>
      <Box className={styles.container}>
        <Text fontSize={{base:"30px", md:"40px", lg: "50px"}}>WELCOME to the Poops Lounge</Text>
        <TimerContainer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          message={message}
        />
        <EngineFunding newMintedCount={totalMinted}/>
        <p>Click on one of your Poops to create your own referral link</p>
        <Box className={styles.tooltip}>
          <span className={styles.tooltiptext}>Copy to clipboard</span>
          <input type='text' value={refLink} className={styles.referralBox} readOnly 
            onClick={() => {navigator.clipboard.writeText(refLink); 
                toast('Copied to clipboard', { hideProgressBar: true, autoClose: 1000, type: 'success' ,position:'top-center' });
                }}>                
          </input>
        </Box>
        <Box className={styles.explain}>
          {!address ? 
            (
              <b>Owned NFTs</b>
            ) :          
            (
              <div>{address?.substring(0,4)}...{address?.substring(address?.length-4)}<br /><b> Owned NFTs</b></div>
            )
          }
        </Box>        
        <Box className={styles.tokenGrid}>
          {isLoading ? (<p>Loading your poops....</p>) : 
          nfts?.map((nft) => {            
            return(
            <Box key={nft?.metadata?.id?.toString()} 
              onClick={() => setRefLink(`https://scc-minter.vercel.app?ref=${(nft?.metadata.name as string).replace('#','').replace(/ /g,'-')}&wallet=${address}`)}
              >
              <p>{nft?.metadata?.name}</p>
                <ThirdwebNftMedia metadata={nft?.metadata} width={nftSize} height={nftSize} className={styles.tokenItem} />
            </Box>)
          })}    
        </Box>   
        <Web3Button
          theme="dark"
          className={styles.mintButton}
          contractAddress={nftDropContractAddress}
          action={(contract) => contract.erc721.claim(1)}  
          onSubmit={() => {
              console.log(`Submitting Change on button - current wallet is ${address}`);
          }}       
          onSuccess={(result) => {
            toast('Mint Successful', { hideProgressBar: true, autoClose: 3000, type: 'success' ,position:'top-center' });
            console.log('Mint Successful');
            updateReferral(referral, result[0].id.toString());                   
          }}
          onError={(error) => {
            console.log('Mint Unsuccessful');
            toast(`Error minting - ${error}`, { hideProgressBar: true, autoClose: 3000, type: 'error' ,position:'top-center' })
          }}>
          Mint an SCC NFT (0.1WETH)
        </Web3Button>
        <br />
        <Box>
          {!totalMintedIsLoading ? 
          (<Text my="2" fontSize={22}>Minted so far: {totalMinted.toString()}/1,000</Text>)
          :(<Text>Checking mint amounts</Text>)        
          }
        </Box>    
        <Text my="2">Your buddys Poop name</Text>
        <Box mb={4}>
          <input
            className={styles.textBox}
            type="text"
            value={referral}
            readOnly
          />          
        </Box>
        <Box my={5}>
          <Text fontSize={30}>Legendary Shillers List</Text> 
        </Box>

        <MintLeaderboard newToken={0} />

      </Box>
    </Box>
  );
};

export default Home;
