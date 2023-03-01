import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Divider,
    HStack,
    Link,
    Skeleton,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link as ReactRouterLink } from "react-router-dom";
import { getMempoolTransactions } from "../api/mempool/transaction";
import { ITransactionListElem } from "../api/mempool/types";

export default function MempoolTable() {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    const { data, isLoading } = useQuery<ITransactionListElem[]>(
        ["transactions"],
        getMempoolTransactions
    );
    return (
        <>
            <Box marginTop={"24"} marginX={"8"}>
                <HStack fontSize={"2xl"}>
                    <Text fontWeight={"medium"} fontFamily={"Raleway"}>
                        Mempool에 올라간 거래 내역
                    </Text>
                    <Tooltip label="블록체인에 추가되지 않은 거래들">
                        <InfoOutlineIcon color={"gray.500"} fontSize={"md"} />
                    </Tooltip>
                </HStack>

                <Divider marginTop={"4"} />
                <TableContainer marginTop={"4"}>
                    <Table variant={"striped"} size={"lg"}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>from</Th>
                                <Th>to</Th>
                                <Th>amount</Th>
                                <Th>status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isLoading ? (
                                <Tr>
                                    <Td colSpan={5}>
                                        <Box display={"flex"} justifyContent={"center"}>
                                            <Spinner size={"lg"} thickness={"5px"} />
                                        </Box>
                                    </Td>
                                </Tr>
                            ) : (
                                data!.map((transaction) => {
                                    return (
                                        <Tr>
                                            <Td isTruncated maxWidth={"40"}>
                                                <Link
                                                    as={ReactRouterLink}
                                                    to={`/transactions/${transaction.txID}`}
                                                    color={highlightColor}
                                                >
                                                    {transaction.txID}
                                                </Link>
                                            </Td>
                                            <Td isTruncated maxWidth={"40"}>
                                                {transaction.from}
                                            </Td>
                                            <Td isTruncated maxWidth={"40"}>
                                                {transaction.to}
                                            </Td>
                                            <Td isTruncated isNumeric maxWidth={"8"}>
                                                {transaction.amount}
                                            </Td>
                                            <Td maxWidth={"12"}>
                                                {transaction.isProccessing ? (
                                                    <Badge
                                                        colorScheme={"green"}
                                                        variant={"solid"}
                                                        fontSize={"sm"}
                                                    >
                                                        processing
                                                    </Badge>
                                                ) : (
                                                    <Badge variant={"solid"}>
                                                        waiting
                                                    </Badge>
                                                )}
                                            </Td>
                                        </Tr>
                                    );
                                })
                            )}
                        </Tbody>
                        <TableCaption color={"gray.500"}>
                            모든 거래는 검증되기 전이므로 유효하지 않을 수 있습니다
                        </TableCaption>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
