import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    HStack,
    Link,
    ListItem,
    OrderedList,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
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
    VStack,
} from "@chakra-ui/react";
import { FaRegStickyNote, FaStickyNote } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import Chart from "../components/partial/Chart";

export default function Home() {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
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
            <Box marginTop={"24"} marginX={"8"}>
                <Text fontWeight={"medium"} fontFamily={"Raleway"} fontSize={"2xl"}>
                    Blockchain
                </Text>
                <Divider marginTop={"4"} />
                <HStack marginX={"24"} marginTop={"8"} justifyContent={"center"}>
                    <Card
                        width={"lg"}
                        height={"lg"}
                        backgroundColor={boxColor}
                        boxShadow={"lg"}
                        borderRadius={"2xl"}
                    >
                        <CardHeader fontSize={"3xl"}>Latest Block</CardHeader>
                        <CardBody>
                            <StatGroup>
                                <Stat>
                                    <StatLabel>Height</StatLabel>
                                    <StatNumber fontFamily={"sans-serif"}>81</StatNumber>
                                    <StatHelpText>블록의 높이 (순서)</StatHelpText>
                                </Stat>
                                <Stat>
                                    <StatLabel>Nonce</StatLabel>
                                    <StatNumber fontFamily={"sans-serif"}>
                                        3512
                                    </StatNumber>
                                    <StatHelpText>hash하기 위한 숫자</StatHelpText>
                                </Stat>
                            </StatGroup>
                            <Stat marginTop={"6"} opacity={"0.8"}>
                                <StatLabel>Hash</StatLabel>
                                <StatNumber fontFamily={"sans-serif"} isTruncated>
                                    aefaelkjh2131l5kjhflauiehf3aeflkjfhelfkjahwelfkjeahflwehflaekjfh
                                </StatNumber>
                                <StatHelpText>블록의 해시값</StatHelpText>
                            </Stat>
                            <Stat marginTop={"6"} opacity={"0.8"}>
                                <StatLabel>Previous Hash</StatLabel>
                                <StatNumber fontFamily={"sans-serif"} isTruncated>
                                    aefaelkjh2131l5kjhflauiehf3aeflkjfhelfkjahwelfkjeahflwehflaekjfh
                                </StatNumber>
                                <StatHelpText>블록의 이전 해시값</StatHelpText>
                            </Stat>
                        </CardBody>
                        <CardFooter justifyContent={"flex-end"}>
                            <Button colorScheme={"blue"} marginRight={"3"}>
                                모든 블록 보기
                            </Button>
                            <Button colorScheme={"blue"} variant={"ghost"}>
                                상세 정보
                            </Button>
                        </CardFooter>
                    </Card>
                    <VStack>
                        <Card
                            width={"lg"}
                            height={"64"}
                            backgroundColor={boxColor}
                            boxShadow={"lg"}
                            borderRadius={"2xl"}
                        >
                            <CardHeader fontSize={"3xl"}>
                                Network Info{" "}
                                <Tooltip label="채굴자 네트워크">
                                    <InfoOutlineIcon color={"gray.500"} fontSize={"md"} />
                                </Tooltip>
                            </CardHeader>
                            <CardBody>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Difficulty</StatLabel>
                                        <StatNumber fontFamily={"sans-serif"}>
                                            4
                                        </StatNumber>
                                        <StatHelpText>hash 난이도</StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Prize</StatLabel>
                                        <StatNumber fontFamily={"sans-serif"}>
                                            10
                                        </StatNumber>
                                        <StatHelpText>거래 당 보상</StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Nodes</StatLabel>
                                        <StatNumber fontFamily={"sans-serif"}>
                                            0
                                        </StatNumber>
                                        <StatHelpText>연결된 노드 수</StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </CardBody>
                            <CardFooter justifyContent={"flex-end"} padding={"0"}>
                                <Button
                                    colorScheme={"blue"}
                                    variant={"link"}
                                    size={"xs"}
                                    marginRight={"8"}
                                    marginBottom={"4"}
                                >
                                    채굴자 되기
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card
                            width={"lg"}
                            height={"64"}
                            backgroundColor={boxColor}
                            boxShadow={"lg"}
                            borderRadius={"2xl"}
                        >
                            <CardHeader fontSize={"3xl"}>Try Blockchain</CardHeader>
                            <CardBody paddingTop={"0"}>
                                <OrderedList marginLeft={"6"} spacing={"1"}>
                                    <ListItem>글을 남깁니다</ListItem>
                                    <ListItem>직접 해시값을 만듭니다</ListItem>
                                    <ListItem>블록체인에 추가합니다</ListItem>
                                    <ListItem>
                                        <Text
                                            fontFamily={"sans-serif"}
                                            display={"inline"}
                                        >
                                            500
                                        </Text>{" "}
                                        OCN을 받습니다
                                    </ListItem>
                                </OrderedList>
                            </CardBody>
                            <CardFooter justifyContent={"flex-end"}>
                                <Button
                                    colorScheme={"blue"}
                                    size={"sm"}
                                    position={"absolute"}
                                    bottom={"6"}
                                    right={"8"}
                                >
                                    글 남기러 가기
                                </Button>
                            </CardFooter>
                        </Card>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
}
