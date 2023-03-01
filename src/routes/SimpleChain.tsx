import {
    Box,
    Divider,
    Heading,
    HStack,
    Spinner,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { getSimpleChainBlocks } from "../api/mempool/simple-chain";
import { ISimpleChainBlocks } from "../api/mempool/types";
import Helmet from "../components/Helmet";
import SimpleChainForm from "../components/SimpleChainForm";

export default function SimpleChain() {
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const { isLoading, data } = useQuery<ISimpleChainBlocks>(
        ["simple-chain-blocks"],
        getSimpleChainBlocks
    );

    return (
        <Box
            width={"100%"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
        >
            <Helmet title="Simple Blockchain" />
            <SimpleChainForm />
            <Box width={"80%"} marginTop={"24"}>
                <Heading textAlign={"center"}>See Blockchain</Heading>
                <Divider marginTop={"4"} />
                <VStack gap={"5"}>
                    {isLoading ? (
                        <Spinner size={"xl"} thickness={"5px"} margin={"10"} />
                    ) : (
                        <>
                            <Box textAlign={"center"} marginY={"4"} color={"gray.500"}>
                                <Text fontSize={"lg"}>total blocks</Text>
                                <Text fontSize={"sm"}>{data?.count}</Text>
                            </Box>
                            {data?.blocks
                                .slice(0)
                                .reverse()
                                .map((block) => (
                                    <>
                                        <Box
                                            bgColor={boxColor}
                                            borderRadius={"2xl"}
                                            boxShadow={"lg"}
                                            width={"xl"}
                                            height={"96"}
                                            padding={"5"}
                                        >
                                            <HStack
                                                justifyContent={"space-between"}
                                                paddingRight={"3"}
                                            >
                                                <Text fontSize={"4xl"}>
                                                    Block {block.height}
                                                </Text>
                                                <Text color={"gray.500"}>
                                                    {moment
                                                        .unix(block.created)
                                                        .format("YYYY-MM-DD")}
                                                </Text>
                                            </HStack>
                                            <Divider />
                                            <StatGroup marginTop={"4"}>
                                                <Stat>
                                                    <StatLabel>Data</StatLabel>
                                                    <StatNumber
                                                        isTruncated
                                                        maxWidth={"64"}
                                                    >
                                                        {block.data}
                                                    </StatNumber>
                                                </Stat>
                                                <Stat marginLeft={"10"}>
                                                    <StatLabel>Nonce</StatLabel>
                                                    <StatNumber>{block.nonce}</StatNumber>
                                                </Stat>
                                            </StatGroup>
                                            <VStack
                                                marginTop={"5"}
                                                fontSize={"md"}
                                                alignItems={"start"}
                                                gap={"3"}
                                                opacity={"0.9"}
                                            >
                                                <Box width={"100%"}>
                                                    <Text>Public Key</Text>
                                                    <Text isTruncated>
                                                        {block.publicKey}
                                                    </Text>
                                                </Box>
                                                <Box width={"100%"}>
                                                    <Text>Hash</Text>
                                                    <Text isTruncated>{block.hash}</Text>
                                                </Box>
                                                <Box width={"100%"}>
                                                    <Text>Previous Hash</Text>
                                                    <Text isTruncated>
                                                        {block.prevHash}
                                                    </Text>
                                                </Box>
                                            </VStack>
                                        </Box>
                                    </>
                                ))}
                        </>
                    )}
                </VStack>
            </Box>
        </Box>
    );
}
