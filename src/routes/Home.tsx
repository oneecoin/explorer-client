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
                                    <StatHelpText>????????? ?????? (??????)</StatHelpText>
                                </Stat>
                                <Stat>
                                    <StatLabel>Nonce</StatLabel>
                                    <StatNumber fontFamily={"sans-serif"}>
                                        {blockLoading || latestBlock === undefined
                                            ? 0
                                            : latestBlock?.nonce}
                                    </StatNumber>
                                    <StatHelpText>hash?????? ?????? ??????</StatHelpText>
                                </Stat>
                            </StatGroup>
                            <Stat marginTop={"6"} opacity={"0.8"}>
                                <StatLabel>Hash</StatLabel>
                                <StatNumber fontFamily={"sans-serif"} isTruncated>
                                    {blockLoading || latestBlock === undefined
                                        ? "null"
                                        : latestBlock?.hash}
                                </StatNumber>
                                <StatHelpText>????????? ?????????</StatHelpText>
                            </Stat>
                            <Stat marginTop={"6"} opacity={"0.8"}>
                                <StatLabel>Previous Hash</StatLabel>
                                <StatNumber fontFamily={"sans-serif"} isTruncated>
                                    {blockLoading || latestBlock?.prevHash === undefined
                                        ? "null"
                                        : latestBlock.prevHash}
                                </StatNumber>
                                <StatHelpText>????????? ?????? ?????????</StatHelpText>
                            </Stat>
                        </CardBody>
                        <CardFooter justifyContent={"flex-end"}>
                            <Button
                                colorScheme={"blue"}
                                marginRight={"3"}
                                as={ReactRouterLink}
                                to={"/blocks"}
                            >
                                ?????? ?????? ??????
                            </Button>
                            {blockLoading ? null : (
                                <>
                                    <Button
                                        colorScheme={"blue"}
                                        variant={"ghost"}
                                        as={ReactRouterLink}
                                        to={`/blocks/${latestBlock?.hash}`}
                                    >
                                        ?????? ??????
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
                                    <Tooltip label="Miner ????????????">
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
                                        <StatHelpText>hash ?????????</StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Prize</StatLabel>
                                        <StatNumber fontFamily={"sans-serif"}>
                                            10
                                        </StatNumber>
                                        <StatHelpText>?????? ??? ??????</StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Nodes</StatLabel>
                                        <StatNumber fontFamily={"sans-serif"}>
                                            {peersLoading ? 0 : peers?.count}
                                        </StatNumber>
                                        <StatHelpText>????????? ?????? ???</StatHelpText>
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
                                    as="a"
                                    href="https://github.com/oneecoin/.github/blob/main/profile/README.md"
                                    isDisabled
                                >
                                    ????????????
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
                                    <ListItem>?????? ????????????</ListItem>
                                    <ListItem>?????? ???????????? ????????????</ListItem>
                                    <ListItem>??????????????? ???????????????</ListItem>
                                    <ListItem>
                                        <Text
                                            fontFamily={"sans-serif"}
                                            display={"inline"}
                                        >
                                            500
                                        </Text>{" "}
                                        OCN??? ????????????
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
                                    ??? ????????? ??????
                                </Button>
                            </CardFooter>
                        </Card>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
}
