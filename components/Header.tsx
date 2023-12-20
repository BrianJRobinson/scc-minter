import { Box, Container, HStack, Link, Spacer, Text, VStack } from "@chakra-ui/react";
import { ConnectWallet, MediaRenderer } from "@thirdweb-dev/react";

export default function Header() {
    return (
        <VStack>
            <Box backgroundColor={"#59246488"} maxH={{base: "60px", md:"80px"}} minW={'100vw'} color={"#EACE09"}>             
                <HStack  alignContent={"center"} p={4}>
                    <Box width={{base:"30px", md:"50px"}} mt={-2}>
                        <MediaRenderer src="https://cryptomischief.io/wp-content/uploads/cm-scc-coin-logo.png" 
                            height="50%"/>
                    </Box>
                    <Box ml={2}>
                        <Text fontSize={{base:"10px", md:"20px", lg:"large"}}>Crypto Winner</Text>
                    </Box>
                    <Spacer />
                        <Text fontSize={{base:"14px", md: "20px", lg: "24px"}}>Sh!tcoin Club NFT Minter</Text>
                    <Spacer />
                    <Box width={{base:"60px", md:"110px", lg:"140px"}} alignItems={"end"} mr={4}>
                        <MediaRenderer src="https://cryptomischief.io/wp-content/uploads/crypto-mischief-logo-300x87.png"
                            height="100%" />
                    </Box>                        
                </HStack>
            </Box>   
        </VStack>
             
    )
}