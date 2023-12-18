import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import axios from "axios";
import {useEffect, useState } from 'react';

type Props = {
    newToken: number;
};

type Shiller = {
    teamName: string,
    referralCount : number,
    wethValue: number,
    dollarValue: number
}

const MintLeaderboard: React.FC<Props> = ({newToken}) => {
    const [data, setData] = useState<Shiller[]>([]);
    const [tokenId, setTokenId] = useState(newToken);

    if (tokenId !== newToken) {
        setTokenId(newToken);
    }

    const getData = async () => {
        console.log(`Getting Data`);
        try {
          const response = await axios.get<Shiller[]>("https://degen-defi.com/api/referral");
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, [tokenId]);

    return(
        <TableContainer color={"#ffcc33"} width={"70%"}>
            <Table>
                <Thead>
                    <Tr backgroundColor={"#592464dd"} height={14}>
                        <Td>Team Name</Td>   
                        <Td>Count</Td> 
                        <Td>Eth</Td> 
                        <Td>US$</Td> 
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((shiller: Shiller, index: number) => (
                        <Tr key={index} backgroundColor={ index % 2 ? "#592464dd" : "#9c59b3dd"}>
                            <Td>{shiller?.teamName} </Td>
                            <Td>{shiller?.referralCount} </Td>
                            <Td>{shiller?.wethValue} </Td>
                            <Td>{shiller?.dollarValue} </Td>
                        </Tr>
                    ))}                   
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default MintLeaderboard