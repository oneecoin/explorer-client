import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Divider,
    HStack,
    Link,
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
import { Link as ReactRouterLink } from "react-router-dom";
import Chart from "../components/partial/Chart";

export default function Home() {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    return (
        <Box mt={"12"}>
            <HStack justifyContent={"center"}>
                <Chart />
            </HStack>
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
                            <Tr>
                                <Td isTruncated maxWidth={"40"}>
                                    <Link
                                        as={ReactRouterLink}
                                        to={"/transactions/ID"}
                                        color={highlightColor}
                                    >
                                        13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
                                    </Link>
                                </Td>
                                <Td isTruncated maxWidth={"40"}>
                                    13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
                                </Td>
                                <Td isTruncated maxWidth={"40"}>
                                    13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
                                </Td>
                                <Td isTruncated isNumeric maxWidth={"8"}>
                                    30
                                </Td>
                                <Td maxWidth={"12"}>
                                    <Badge
                                        colorScheme={"green"}
                                        variant={"solid"}
                                        fontSize={"sm"}
                                    >
                                        processing
                                    </Badge>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td isTruncated maxWidth={"40"}>
                                    <Link
                                        as={ReactRouterLink}
                                        to={"/transactions/ID"}
                                        color={highlightColor}
                                    >
                                        13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
                                    </Link>
                                </Td>
                                <Td isTruncated maxWidth={"40"}>
                                    13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
                                </Td>
                                <Td isTruncated maxWidth={"40"}>
                                    13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
                                </Td>
                                <Td isTruncated isNumeric maxWidth={"8"}>
                                    30
                                </Td>
                                <Td maxWidth={"12"}>
                                    <Badge variant={"solid"}>waiting</Badge>
                                </Td>
                            </Tr>
                        </Tbody>
                        <TableCaption color={"gray.500"}>
                            모든 거래는 검증되기 전이므로 유효하지 않은 상태일 수 있습니다
                        </TableCaption>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
