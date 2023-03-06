import {
    Box,
    Card,
    CardBody,
    Divider,
    HStack,
    Spinner,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
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
                    <Box marginTop={"20"}>
                        {isLoading ? (
                            <Box
                                width={"100%"}
                                height={"40"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Spinner size={"xl"} thickness="5px" />
                            </Box>
                        ) : (
                            <>
                                <Tabs>
                                    <TabList>
                                        {data!.transactions.map((tx) => {
                                            return (
                                                <Tab width={"44"}>
                                                    <Text width={"40"} isTruncated>
                                                        {tx.id}
                                                    </Text>
                                                </Tab>
                                            );
                                        })}
                                    </TabList>
                                    <TabPanels>
                                        {data!.transactions.map((tx) => {
                                            return (
                                                <TabPanel paddingX={"12"}>
                                                    <HStack
                                                        fontSize={"lg"}
                                                        justifyContent={"space-between"}
                                                        marginBottom={"4"}
                                                    >
                                                        <Text>Transaction: {tx.id}</Text>
                                                        <Text color={"gray.500"}>
                                                            {formatTime(tx.timestamp)}
                                                        </Text>
                                                    </HStack>
                                                    <Text
                                                        color={"gray.500"}
                                                        marginTop={"4"}
                                                    >
                                                        From: {tx.txIns.from}
                                                    </Text>
                                                    <Box marginTop={"12"}>
                                                        <Text>Input</Text>
                                                        <HStack marginTop={"5"}>
                                                            {tx.txIns.v.map((txIn) => {
                                                                return (
                                                                    <Card width={"64"}>
                                                                        <CardBody>
                                                                            <Text
                                                                                isTruncated
                                                                            >
                                                                                Block:{" "}
                                                                                {txIn.blockHash ===
                                                                                ""
                                                                                    ? "SYSTEM"
                                                                                    : txIn.blockHash}
                                                                            </Text>
                                                                            <Divider
                                                                                marginY={
                                                                                    "2"
                                                                                }
                                                                            />
                                                                            <Text
                                                                                isTruncated
                                                                            >
                                                                                TxID:{" "}
                                                                                {txIn.txId ===
                                                                                ""
                                                                                    ? "null"
                                                                                    : txIn.txId}
                                                                            </Text>
                                                                            <Text
                                                                                isTruncated
                                                                            >
                                                                                Signature:{" "}
                                                                                {txIn.signature ===
                                                                                ""
                                                                                    ? "null"
                                                                                    : txIn.signature}
                                                                            </Text>
                                                                            <Text
                                                                                isTruncated
                                                                            >
                                                                                Index:{" "}
                                                                                {
                                                                                    txIn.index
                                                                                }
                                                                            </Text>
                                                                        </CardBody>
                                                                    </Card>
                                                                );
                                                            })}
                                                        </HStack>
                                                    </Box>
                                                    <Box marginTop={"12"}>
                                                        <Text>Output</Text>
                                                        <HStack marginTop={"5"}>
                                                            {tx.txOuts.map((txOut) => {
                                                                return (
                                                                    <Card width={"64"}>
                                                                        <CardBody>
                                                                            <Text
                                                                                isTruncated
                                                                            >
                                                                                Public
                                                                                Key:{" "}
                                                                                {
                                                                                    txOut.publicKey
                                                                                }
                                                                            </Text>
                                                                            <Divider
                                                                                marginY={
                                                                                    "2"
                                                                                }
                                                                            />
                                                                            <Text
                                                                                isTruncated
                                                                            >
                                                                                Amount:{" "}
                                                                                {
                                                                                    txOut.amount
                                                                                }
                                                                            </Text>
                                                                        </CardBody>
                                                                    </Card>
                                                                );
                                                            })}
                                                        </HStack>
                                                    </Box>
                                                </TabPanel>
                                            );
                                        })}
                                    </TabPanels>
                                </Tabs>
                            </>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}
