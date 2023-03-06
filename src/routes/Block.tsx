import {
    Box,
    Divider,
    Spinner,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBlock } from "../api/mempool/blocks";
import { IBlock } from "../api/mempool/types";
import Helmet from "../components/Helmet";
import { formatTime } from "../lib/format-time";

export default function Block() {
    const { hash } = useParams();
    const { data, isLoading } = useQuery<IBlock>(["blocks", hash], getBlock, {
        refetchOnWindowFocus: false,
    });
    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} marginTop={"12"}>
            {isLoading ? (
                <Spinner size={"lg"} thickness="5px" />
            ) : (
                <Box width={"100%"} paddingX={"12"}>
                    <Helmet title={`Block #${data!.height}`} />
                    <Text fontSize={"4xl"}>Block #{data?.height}</Text>
                    <Divider marginY={"4"} />
                    <StatGroup width={"70%"}>
                        <Stat>
                            <StatLabel>Nonce</StatLabel>
                            <StatNumber>{data?.nonce}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Created At</StatLabel>
                            <StatNumber>{formatTime(data!.timestamp)}</StatNumber>
                        </Stat>
                    </StatGroup>
                    <Box marginTop={"4"}>
                        <Text>Hash</Text>
                        <Text fontSize={"xl"}>{data?.hash}</Text>
                    </Box>
                    <Box marginTop={"4"}>
                        <Text>Previous Hash</Text>
                        <Text fontSize={"xl"}>
                            {data?.prevHash === undefined ? "null" : data?.prevHash}
                        </Text>
                    </Box>
                    <Box>
                        
                    </Box>
                </Box>
            )}
        </Box>
    );
}
