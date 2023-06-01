import { 
  Web3Button,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs, 
  ConnectWallet
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { nftDropContractAddress } from "../consts/contractAddresses";
import { apiAddress } from "../consts/apiAddresses";

import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { toast } from "react-toastify";
import Referrals  from "../referrals"

const Home: NextPage = () => {
  const router = useRouter()
  const queryParameters = router.query

  const [referral, setReferral] = useState('Team');
  const [tokenId, setTokenId] = useState('0');

  console.log(nftDropContractAddress);

  const { contract } = useContract(nftDropContractAddress);
  const address = useAddress();

  console.log(address);
  const { data: nfts, isLoading: isLoading } = useOwnedNFTs(contract, address);

  console.log(nfts);

  const updateReferral = async (team: string, id:string) => {
    const response = await fetch(`${apiAddress}team=${team}&tokenid=${id}`, {
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
    }
  }, [router.isReady])  

  useEffect(() => { 
    setReferral(window.localStorage.getItem('referral') as string);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('referral', referral);
  }, [referral]);

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.h1}>Mint an SCC NFT!</h1>

        <p className={styles.explain}>
          <b>MINT YOUR POOPY MEMBERSHIP</b>
        </p>
        <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
        <p className={styles.explain}>
          <b>Owned NFTs</b>
        </p> 
        <div className={styles.tokenGrid}>
          {isLoading ? (<p>Loading your poops....</p>) : 
          nfts?.map((nft) => {
            return(
            <div key={nft.metadata.id.toString()}>
              <p>{nft.metadata.name}</p>
              <ThirdwebNftMedia metadata={nft.metadata} width="200px" height="200px" className={styles.tokenItem}/>
            </div>)
          })}    
        </div>   
        <Web3Button
          theme="dark"
          className={styles.sigmaButton}
          contractAddress={nftDropContractAddress}
          action={(contract) => contract.erc721.claim(1)}        
          onSuccess={(result) => {
            toast('Mint Successful', { hideProgressBar: true, autoClose: 3000, type: 'success' ,position:'top-center' });
            updateReferral(referral, result[0].id);                   
          }}
          onError={(error) => {
            toast(`Error minting - ${error}`, { hideProgressBar: true, autoClose: 3000, type: 'error' ,position:'top-center' })
          }}
        >
          Mint A Poop
        </Web3Button>
        <br />
        <p>Your buddys Poop name</p>
        <input
          className={styles.textBox}
          type="text"
          value={referral}
          onChange={e => setReferral(e.target.value)}
          onBlur={e => {if (e.target.value === '') e.target.value = 'Team'}}
        />
        <Referrals newToken={tokenId} />
      </div>
    </div>
  );
};

export default Home;
