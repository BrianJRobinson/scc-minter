import { Box, Stack, Text } from '@chakra-ui/react';
import axios from "axios";
import {useEffect, useState } from 'react';

type Props = {
    newMintedCount: number;
};

type Price = {
    item : {
        id: 2,
        name: string,
        symbol: string,
        chain: string,
        contractAddress: string,
        price: Number,
        isPair: boolean,
        lastUpdate: Date,
        sStablePool: false,
        tombPairAddresses: string,
        useDexScreener: boolean
    },
}

const EngineFunding: React.FC<Props> = ({newMintedCount}) => {
    const [wethPrice, setWethPrice] = useState<Price>();
    const [maticPrice, setMaticPrice] = useState<Price>();
    const [mintedCount, setMintedCount] = useState(newMintedCount);

    const maticCount: Number = 23773;

    if (mintedCount !== newMintedCount) {
        setMintedCount(newMintedCount);
    }

    const engineFunded = ():Number => {
        return wethPrice && wethPrice.item.price && newMintedCount ? Number(wethPrice?.item?.price) * ((mintedCount - 380) * .1) * .2 : 0
    }

    const maticPayout = ():Number => {
        return maticPrice && maticPrice.item.price && newMintedCount ? Number(maticPrice?.item?.price) * Number(maticCount) : 0
    }    

    const getData = async () => {
        console.log(`Getting Data`);
        try {
          const response = await axios.get<Price>("https://degen-defi.com/api/degenprice/getprice/0x184a2EfA325793a297dDC9dBAe55e8216162C9fd/bsc/0x2170Ed0880ac9A755fd29B2688956BD959F933F8");
          console.log(response.data);
          setWethPrice(response.data);
        } catch (error) {
          console.log(error);
        }
    };

    const getMaticPrice = async () => {
        console.log(`Getting Data`);
        try {
          const response = await axios.get<Price>("https://degen-defi.com/api/degenprice/getprice/0x184a2EfA325793a297dDC9dBAe55e8216162C9fd/polygon/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270");
          console.log(response.data);
          setMaticPrice(response.data);
        } catch (error) {
          console.log(error);
        }
    };    

    useEffect(() => {
        getData();
        getMaticPrice();
    }, [mintedCount]);

    return(
        <Box>
            <Stack direction={['column', 'row']} spacing={5}>
                <Box bgColor={"#200b31DD"} color={"#9c59b3"} mb={10} px={5}>
                    <Text fontSize={24} className="margin-bottom: 0px">Sent to Engine</Text>
                    <Text fontSize={24} className="margin-bottom: 0px">{((mintedCount - 380) * .1 * .2).toFixed(2)} WETH</Text>
                    <Text fontSize={24}>${engineFunded().toFixed(2)}</Text>
                </Box>
                <Box bgColor={"#200b31DD"} color={"#9c59b3"} mb={10} px={5}>
                    <Text fontSize={24} className="margin-bottom: 0px">Paid to Holders</Text>
                    <Text fontSize={24} className="margin-bottom: 0px">{maticCount.toString()} Matic</Text>
                    <Text fontSize={24}>${maticPayout().toFixed(2)}</Text>
                </Box>            
            </Stack>
        </Box>        
    )
}

export default EngineFunding