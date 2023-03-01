import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    HStack,
    Spinner,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { FaQuestion, FaRegQuestionCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getMempoolTransaction } from "../api/mempool/transaction";
import { ITransactionRes } from "../api/mempool/types";
import Helmet from "../components/Helmet";
import { formatTime } from "../lib/format-time";

export default function Transaction() {
    const { id } = useParams();
    const { data, isLoading } = useQuery<ITransactionRes>(
        ["transactions", id],
        getMempoolTransaction
    );
    return (
        <>
            {!isLoading ? (
                <>
                    {data !== undefined ? (
                        <Box width={"100%"} paddingTop={"5"}>
                            <Helmet title={`${data.tx.id}`} />
                            <VStack alignItems={"start"} gap={"3"}>
                                <HStack>
                                    <Text fontSize={"3xl"}>Transaction </Text>
                                    <Text paddingTop={"2"}>{data.tx.id}</Text>
                                </HStack>
                                <Divider />
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Created</StatLabel>
                                        <StatNumber width={"96"}>
                                            {formatTime(data.tx.timestamp)}
                                        </StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Status</StatLabel>
                                        <StatNumber>
                                            {data.isProcessing ? (
                                                <Badge
                                                    colorScheme={"green"}
                                                    variant={"solid"}
                                                    fontSize={"sm"}
                                                >
                                                    processing
                                                </Badge>
                                            ) : (
                                                <Badge variant={"solid"}>waiting</Badge>
                                            )}
                                        </StatNumber>
                                    </Stat>
                                </StatGroup>
                                <Box>
                                    <Text>Input</Text>
                                    <Text marginTop={"2"}>
                                        From: {data.tx.txIns.from}
                                    </Text>
                                    <HStack marginTop={"4"} gap={"4"}>
                                        {data.tx.txIns.v.map((txIn) => {
                                            return (
                                                <Card width={"64"}>
                                                    <CardBody>
                                                        <Text isTruncated>
                                                            Block:{" "}
                                                            {txIn.blockHash === ""
                                                                ? "SYSTEM"
                                                                : txIn.blockHash}
                                                        </Text>
                                                        <Divider marginY={"2"} />
                                                        <Text isTruncated>
                                                            TxID:{" "}
                                                            {txIn.txId === ""
                                                                ? "null"
                                                                : txIn.txId}
                                                        </Text>
                                                        <Text isTruncated>
                                                            Signature:{" "}
                                                            {txIn.signature === ""
                                                                ? "null"
                                                                : txIn.signature}
                                                        </Text>
                                                        <Text isTruncated>
                                                            Index: {txIn.index}
                                                        </Text>
                                                    </CardBody>
                                                </Card>
                                            );
                                        })}
                                    </HStack>
                                </Box>
                                <Box>
                                    <Text>Output</Text>
                                    <HStack marginTop={"4"} gap={"4"}>
                                        {data.tx.txOuts.map((txOut) => {
                                            return (
                                                <Card width={"64"}>
                                                    <CardBody>
                                                        <Text isTruncated>
                                                            Public Key: {txOut.publicKey}
                                                        </Text>
                                                        <Divider marginY={"2"} />
                                                        <Text isTruncated>
                                                            Amount: {txOut.amount}
                                                        </Text>
                                                    </CardBody>
                                                </Card>
                                            );
                                        })}
                                    </HStack>
                                </Box>
                            </VStack>
                        </Box>
                    ) : (
                        <VStack
                            display={"flex"}
                            justifyContent={"center"}
                            width={"100%"}
                            height={"lg"}
                        >
                            <Helmet title={`Transaction Not Found`} />
                            <Box fontSize={"5xl"}>
                                <FaRegQuestionCircle />
                            </Box>
                            <Heading>Transaction Not Found</Heading>
                            <Link to="/">
                                <Button colorScheme={"blue"}>돌아가기</Button>
                            </Link>
                        </VStack>
                    )}
                </>
            ) : (
                <VStack
                    display={"flex"}
                    justifyContent={"center"}
                    width={"100%"}
                    height={"xl"}
                >
                    <Helmet title={`Loading...`} />
                    <Spinner size={"xl"} thickness={"5px"} />
                    <Heading>Loading Transaction..</Heading>
                </VStack>
            )}
        </>
    );
}
