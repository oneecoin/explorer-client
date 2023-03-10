import {
    Box,
    Button,
    Heading,
    HStack,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { getTransactionCount } from "../api/server/transaction";

interface ITransactionCount {
    date: string;
    count: number;
}

export default function Chart() {
    const { colorMode } = useColorMode();
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const statColor = useColorModeValue("blue.600", "blue.300");
    const [scope, setScope] = useState("week");
    const [total, setTotal] = useState(-1);
    const [average, setAverage] = useState(-1);
    const [max, setMax] = useState(-1);
    const { isLoading, data } = useQuery<ITransactionCount[]>(
        ["txCounts", scope],
        getTransactionCount
    );

    useEffect(() => {
        const counts = data?.map(({ count }) => count) ?? [];
        if (counts.length !== 0) {
            const totalCount = counts.reduce((acc, cur) => acc + cur, 0);
            setTotal(totalCount);
            setAverage(parseFloat((totalCount / counts.length).toFixed(2)));
            setMax(Math.max.apply(null, counts));
        } else {
            setTotal(0);
            setAverage(0);
            setMax(0);
        }
    }, [data]);

    return (
        <>
            <Box width={"700px"} boxShadow={"lg"} borderRadius={"2xl"} bgColor={boxColor}>
                <ApexCharts
                    type="line"
                    series={[
                        // data
                        {
                            name: "count",
                            data: isLoading
                                ? []
                                : (data?.map(({ count }) => count) as number[]) ?? [],
                        },
                    ]}
                    options={{
                        noData: {
                            text: "No Data :(",
                            align: "center",
                            verticalAlign: "middle",
                            offsetX: 0,
                            offsetY: 0,
                            style: {
                                color: "#bbb",
                                fontSize: "2rem",
                                fontFamily: "Raleway",
                            },
                        },

                        // theme
                        theme: {
                            mode: colorMode,
                        },
                        title: {
                            text: "Oneecoin ?????????",
                            align: "left",
                            margin: 10,
                            offsetX: 30,
                            offsetY: 50,
                            floating: false,
                            style: {
                                fontSize: "2rem",
                                fontFamily: "Raleway",
                                color: "",
                            },
                        },
                        chart: {
                            //????????? ????????? ???????????? ???????????? ??????
                            height: "100%",
                            width: "100%",
                            toolbar: { show: false },
                            background: "transparent", //??????
                            zoom: {
                                enabled: false,
                            },
                        },
                        stroke: {
                            //?????? ????????? ???????????? ??????, ????????? 3?????? ??????
                            curve: "smooth",
                            width: 5,
                        },
                        grid: {
                            //?????? ??????
                            show: false,
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shade: "dark",
                                gradientToColors: ["#FDD835"],
                                shadeIntensity: 1,
                                type: "horizontal",
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100, 100, 100],
                            },
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                            categories: data?.map(({ date }) => date) as string[],
                        },
                        yaxis: {
                            //y?????? ?????? ??????
                            show: false,
                        },
                    }}
                ></ApexCharts>
            </Box>
            <Box
                width={"300px"}
                height={"449.78px"}
                boxShadow={"lg"}
                borderRadius={"2xl"}
                bgColor={boxColor}
                fontFamily={"sans-serif"}
            >
                <Heading marginTop={"5"} textAlign={"center"} fontSize={"2rem"}>
                    ??????
                </Heading>
                <Box marginTop={"5"}>
                    <Text textAlign={"center"}>??????</Text>
                    <HStack justifyContent={"center"} marginTop={"3"}>
                        <Button
                            width={"24"}
                            isDisabled={scope === "week"}
                            onClick={() => {
                                setScope("week");
                            }}
                        >
                            7???
                        </Button>
                        <Button
                            width={"24"}
                            isDisabled={scope === "month"}
                            onClick={() => {
                                setScope("month");
                            }}
                        >
                            30???
                        </Button>
                    </HStack>
                </Box>
                <StatGroup>
                    <VStack
                        marginTop={"10"}
                        marginLeft={"-44"}
                        alignItems={"start"}
                        fontSize={"2xl"}
                    >
                        <Stat>
                            <StatLabel>??????</StatLabel>
                            <StatNumber color={statColor}>
                                {total !== -1 ? total : "No Data"}
                            </StatNumber>
                        </Stat>

                        <Stat>
                            <StatLabel>??????</StatLabel>
                            <StatNumber color={statColor}>
                                {average !== -1 ? average : "No Data"}
                            </StatNumber>
                        </Stat>

                        <Stat>
                            <StatLabel>??????</StatLabel>
                            <StatNumber color={statColor}>
                                {max !== -1 ? max : "No Data"}
                            </StatNumber>
                        </Stat>
                    </VStack>
                </StatGroup>
            </Box>
        </>
    );
}
