import { Box, Spinner, Text } from '@chakra-ui/react';
import axios from "axios";
import {useEffect, useRef, useState } from 'react';
import { NFTContract, ThirdwebNftMedia, UseContractResult, useContract, useNFT, SmartContract, MediaRenderer } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { nftDropContractAddress } from "../consts/contractAddresses";

type Props = {
    maxNum: number
};

const nftSize: Number = 10;

const NFTItemDisplay: React.FC<Props> = ({maxNum}) => {
    const { contract } = useContract(nftDropContractAddress);
    const { data: nft, isLoading, error } = useNFT(contract, Math.floor(Math.random() * maxNum));
    const [ currentMaxNum, setCurrentMaxNum ] = useState(maxNum);

    console.log("Max num is " + maxNum)
    return(
        <Box>
            {!isLoading && currentMaxNum !== maxNum ? (
                <MediaRenderer src={nft?.metadata.image} width='50px' height='50px'/>
            )
            : (
                <></>
            )
            }
        </Box>
    )
}

export default NFTItemDisplay