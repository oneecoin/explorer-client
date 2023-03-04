import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    HStack,
    ListItem,
    OrderedList,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
    Tooltip,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FaRegHdd } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import Helmet from "../components/Helmet";
import Chart from "../components/Chart";
import MempoolTable from "../components/MempoolTable";
import { useQuery } from "@tanstack/react-query";
import { IBlock, IPeersCount } from "../api/mempool/types";
import { getPeersCount } from "../api/mempool/mempool";
import { getLatestBlock } from "../api/mempool/blocks";

export default function Home() {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const { isLoading: peersLoading, data: peers } = useQuery<IPeersCount>(
        ["peers-count"],
        getPeersCount
    );

    const { data: latestBlock, isLoading: blockLoading } = useQuery<IBlock>(
        ["latest-block"],
        getLatestBlock
    );
    return (
        <Box mt={"12"}>
            <Helmet title="Home" />
            <HStack justifyContent={"center"}>
                <Chart />
            </HStack>
            <MempoolTable />
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
                                    <StatNumber fontFamily={"sans-serif"}>
                                        {blockLoading || latestBlock === undefined
                                            ? 0
                                            : latestBlock?.height}
                                    </StatNumber>
                                    <StatHelpText>블록의 높이 (순서)</StatHelpText>
                                </Stat>
                                <Stat>
                                    <StatLabel>Nonce</StatLabel>
                                    <StatNumber fontFamily={"sans-serif"}>
                                        {blockLoading || latestBlock === undefined
                                            ? 0
                                            : latestBlock?.nonce}
                                    </StatNumber>
                                    <StatHelpText>hash하기 위한 숫자</StatHelpText>
                                </Stat>
                            </StatGroup>
                            <Stat marginTop={"6"} opacity={"0.8"}>
                                <StatLabel>Hash</StatLabel>
                                <StatNumber fontFamily={"sans-serif"} isTruncated>
                                    {blockLoading || latestBlock === undefined
                                        ? "null"
                                        : latestBlock?.hash}
                                </StatNumber>
                                <StatHelpText>블록의 해시값</StatHelpText>
                            </Stat>
                            <Stat marginTop={"6"} opacity={"0.8"}>
                                <StatLabel>Previous Hash</StatLabel>
                                <StatNumber fontFamily={"sans-serif"} isTruncated>
                                    {blockLoading || latestBlock?.prevHash === undefined
                                        ? "null"
                                        : latestBlock.prevHash}
                                </StatNumber>
                                <StatHelpText>블록의 이전 해시값</StatHelpText>
                            </Stat>
                        </CardBody>
                        <CardFooter justifyContent={"flex-end"}>
                            <Button
                                colorScheme={"blue"}
                                marginRight={"3"}
                                as={ReactRouterLink}
                                to={"/blocks"}
                            >
                                모든 블록 보기
                            </Button>
                            {blockLoading ? null : (
                                <>
                                    <Button
                                        colorScheme={"blue"}
                                        variant={"ghost"}
                                        as={ReactRouterLink}
                                        to={`/blocks/${latestBlock?.hash}`}
                                    >
                                        상세 정보
                                    </Button>
                                </>
                            )}
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
                                <HStack>
                                    <Box color={highlightColor}>
                                        <FaRegHdd />
                                    </Box>
                                    <Text color={""}>Network Info</Text>{" "}
                                    <Tooltip label="Miner 네트워크">
                                        <InfoOutlineIcon
                                            color={"gray.500"}
                                            fontSize={"md"}
                                        />
                                    </Tooltip>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Difficulty</StatLabel>
                                        <StatNumber fontFamily={"sans-serif"}>
                                            5
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
                                            {peersLoading ? 0 : peers?.count}
                                        </StatNumber>
                                        <StatHelpText>연결된 노드 수</StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </CardBody>
                            <CardFooter justifyContent={"flex-end"} padding={"0"}>
                                <Button
                                    colorScheme={"blue"}
                                    variant={"ghost"}
                                    size={"xs"}
                                    marginRight={"8"}
                                    marginBottom={"4"}
                                    as={ReactRouterLink}
                                    to={"/miners/doc"}
                                >
                                    채굴하기
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
                                    variant={"outline"}
                                    as={ReactRouterLink}
                                    to={"/simple-chain"}
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
