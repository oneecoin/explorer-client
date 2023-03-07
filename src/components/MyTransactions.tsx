import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    HStack,
    Skeleton,
    Spinner,
    Tag,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPray } from "react-icons/fa";
import { ITransaction } from "../api/mempool/types";
import { getMyTransactions } from "../api/mempool/wallet";
import { useTinyUser } from "../api/server/auth";
import { formatTime } from "../lib/format-time";

interface IMTxProps {
    isLoaded: boolean;
}

export default function MyTransactions({ isLoaded }: IMTxProps) {
    const [txLoading, setTxLoading] = useState(false);
    const [txs, setTxs] = useState<ITransaction[]>([]);
    const { user, isLoggedIn } = useTinyUser();
    const onClick = async () => {
        setTxLoading(true);
        const txs = await getMyTransactions(user!.public_key);
        setTxs(txs);
        setTxLoading(false);
    };

    return (
        <>
            <Box width={"80%"}>
                <VStack gap={"5"}>
                    <Skeleton isLoaded={isLoaded}>
                        <Button
                            colorScheme={"blue"}
                            variant={"outline"}
                            size={"lg"}
                            onClick={onClick}
                            isDisabled={!isLoggedIn}
                        >
                            거래 내역 보기
                        </Button>
                    </Skeleton>
                    {txLoading ? (
                        <Spinner size={"xl"} thickness="5px" />
                    ) : (
                        <Accordion width={"95%"} size={"xl"} allowToggle>
                            {txs.map((tx) => {
                                return (
                                    <AccordionItem width={"100%"}>
                                        <AccordionButton>
                                            <Box
                                                paddingX={"5"}
                                                fontSize={"xl"}
                                                width={"100%"}
                                                display={"flex"}
                                                justifyContent={"space-between"}
                                            >
                                                <HStack>
                                                    <Box
                                                        width={"32"}
                                                        display={"flex"}
                                                        justifyContent={"start"}
                                                    >
                                                        {tx.txIns.from ===
                                                        user!.public_key ? (
                                                            <Tag
                                                                size={"lg"}
                                                                colorScheme={"blue"}
                                                            >
                                                                Sent
                                                            </Tag>
                                                        ) : (
                                                            <Tag
                                                                size={"lg"}
                                                                colorScheme={"green"}
                                                            >
                                                                Received
                                                            </Tag>
                                                        )}
                                                    </Box>
                                                    <Text>{tx.txOuts[0].amount}</Text>
                                                </HStack>
                                                <Text color={"gray.500"}>
                                                    {formatTime(tx.timestamp)}
                                                </Text>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel
                                            paddingBottom={"12"}
                                            paddingX={"10"}
                                        >
                                            <Text
                                                fontSize={"xl"}
                                                marginTop={"5"}
                                                color={"gray.500"}
                                            >
                                                Transaction: {tx.id}
                                            </Text>
                                            <Text
                                                marginTop={"5"}
                                                fontSize={"xl"}
                                                color={"gray.500"}
                                            >
                                                {tx.txIns.from === user!.public_key
                                                    ? `to: ${tx.txOuts[0].publicKey}`
                                                    : `from: ${tx.txIns.from}`}
                                            </Text>
                                            <Box marginTop={"12"}>
                                                <Text>Input</Text>
                                                <HStack marginTop={"5"}>
                                                    {tx.txIns.v.map((txIn) => {
                                                        return (
                                                            <Card width={"64"}>
                                                                <CardBody>
                                                                    <Text isTruncated>
                                                                        Block:{" "}
                                                                        {txIn.blockHash ===
                                                                        ""
                                                                            ? "SYSTEM"
                                                                            : txIn.blockHash}
                                                                    </Text>
                                                                    <Divider
                                                                        marginY={"2"}
                                                                    />
                                                                    <Text isTruncated>
                                                                        TxID:{" "}
                                                                        {txIn.txId === ""
                                                                            ? "null"
                                                                            : txIn.txId}
                                                                    </Text>
                                                                    <Text isTruncated>
                                                                        Signature:{" "}
                                                                        {txIn.signature ===
                                                                        ""
                                                                            ? "null"
                                                                            : txIn.signature}
                                                                    </Text>
                                                                    <Text isTruncated>
                                                                        Index:{" "}
                                                                        {txIn.index}
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
                                                                    <Text isTruncated>
                                                                        Public Key:{" "}
                                                                        {txOut.publicKey}
                                                                    </Text>
                                                                    <Divider
                                                                        marginY={"2"}
                                                                    />
                                                                    <Text isTruncated>
                                                                        Amount:{" "}
                                                                        {txOut.amount}
                                                                    </Text>
                                                                </CardBody>
                                                            </Card>
                                                        );
                                                    })}
                                                </HStack>
                                            </Box>
                                        </AccordionPanel>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    )}
                </VStack>
            </Box>
        </>
    );
}
