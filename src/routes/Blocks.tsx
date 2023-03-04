import {
    Box,
    IconButton,
    Link,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getBlocks } from "../api/mempool/blocks";
import { IBlockListElem } from "../api/mempool/types";
import Helmet from "../components/Helmet";
import { formatTime } from "../lib/format-time";

export default function Blocks() {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    const [page, setPage] = useState(1);
    const { data, isLoading } = useQuery<IBlockListElem[]>(["blocks", page], getBlocks);

    return (
        <>
            <Helmet title={`Blocks: page ${page}`} />
            <Box
                marginTop={"12"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <TableContainer width={"90%"} marginTop={"3"}>
                    <Table variant={"striped"} size={"sm"}>
                        <Thead>
                            <Tr width={"100%"}>
                                <Th>height</Th>
                                <Th>hash</Th>
                                <Th>transactions count</Th>
                                <Th>time stamp</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isLoading ? (
                                <Tr>
                                    <Td colSpan={4}>
                                        <Spinner size={"xl"} thickness="5px" />
                                    </Td>
                                </Tr>
                            ) : (
                                data?.map((block) => (
                                    <>
                                        <Tr>
                                            <Td minWidth={"12"}>{block.height}</Td>
                                            <Td isTruncated maxWidth={"64"}>
                                                <Link
                                                    as={ReactRouterLink}
                                                    to={`/blocks/${block.hash}`}
                                                    color={highlightColor}
                                                >
                                                    {block.hash}
                                                </Link>
                                            </Td>
                                            <Td width={"52"}>
                                                {block.transactionsCount}
                                            </Td>
                                            <Td>{formatTime(block.timestamp)}</Td>
                                        </Tr>
                                    </>
                                ))
                            )}
                        </Tbody>
                        <TableCaption fontSize={"xl"}>
                            <IconButton
                                aria-label="left-icon"
                                icon={<FaAngleLeft />}
                                colorScheme={"blue"}
                                variant={"ghost"}
                                isDisabled={isLoading || page === 1}
                                onClick={() => setPage(page - 1)}
                            />{" "}
                            <Text display={"inline-block"} marginX={"5"}>
                                page {page}
                            </Text>
                            <IconButton
                                aria-label="right-icon"
                                icon={<FaAngleRight />}
                                colorScheme={"blue"}
                                variant={"ghost"}
                                isDisabled={
                                    isLoading || data !== undefined
                                        ? data![data!.length - 1].height === 1
                                        : true
                                }
                                onClick={() => setPage(page + 1)}
                            />{" "}
                        </TableCaption>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
