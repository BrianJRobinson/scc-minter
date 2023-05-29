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
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: "100",
  subsets: ['latin']
});

const Home: NextPage = () => {
  const router = useRouter()
  const queryParameters = router.query
  //const poops = ['Richie','Colin','Brian','Weebo','Jethie'];
  //const [referral, setReferral] = useState(poops[Math.floor(Math.random() * poops.length)]);
  const [referral, setReferral] = useState('Team');
  const [maxSupply, setMaxSupply] = useState(0);

  console.log(nftDropContractAddress);

  const { contract } = useContract(nftDropContractAddress);
  const address = useAddress();

  console.log(address);
  const { data: nfts, isLoading: isLoading } = useOwnedNFTs(contract, address);

  console.log(nfts);

  useEffect(() => {
    if (router.isReady) {
      if(queryParameters.ref as string != "")
        setReferral(queryParameters.ref as string);
    }
  }, [router.isReady])  

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
          onSuccess={() => {
            alert("NFT Claimed!");
            router.push("/stake");
          }}
          onError={(error) => {
            alert(error);
          }}
        >
          Mint An NFT
        </Web3Button>
        <br />
        <p>Referral</p>
        <input
          className={styles.textBox}
          type="text"
          value={referral}
          onChange={e => setReferral(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
