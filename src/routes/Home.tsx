import {
    Badge,
    Box,
    Divider,
    Heading,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import Chart from "../components/partial/Chart";

export default function Home() {
    return (
        <Box mt={"12"}>
            <HStack justifyContent={"center"}>
                <Chart />
            </HStack>
            <Box marginTop={"24"} marginX={"8"}>
                <Heading fontWeight={"medium"} fontFamily={"Raleway"}>
                    Mempool에 올라간 거래 내역
                </Heading>
                <Divider marginTop={"4"} />
                <TableContainer marginTop={"4"}>
                    <Table variant={"striped"} size={"lg"}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>송신 주소</Th>
                                <Th>수신 주소</Th>
                                <Th>금액</Th>
                                <Th>상태</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td isTruncated maxWidth={"40"}>
                                    13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
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
                                    13390be6f2805a24070a0eb890008a64dfae722911f7bceb466925652d73315a14a195f336d954644b2c2548a478582c3584ea52afbe992b163733fec374ea8e
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
                        <TableCaption>
                            모든 거래는 검증되기 전이므로 유효하지 않은 상태일 수 있습니다
                        </TableCaption>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
