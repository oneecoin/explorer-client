import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export default function Blocks() {
    return (
        <>
            <Box
                marginTop={"12"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Text>Page 1</Text>
                <Table variant={"striped"} width={"90%"} marginTop={"3"} size={"sm"}>
                    <Thead>
                        <Tr width={"100%"}>
                            <Th>height</Th>
                            <Th>hash</Th>
                            <Th>transactions count</Th>
                            <Th>time stamp</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td minWidth={"32"}>32</Td>
                            <Td isTruncated maxWidth={"64"}>
                                eafelfajhfleajfhalkejfefaaefhalfjheflakejfheffaefaefaewfwefewfhalkjfheljfhaefaefaeffefaefwf
                            </Td>
                            <Td width={"52"}>3</Td>
                            <Td>2022-03-01 22:20:10</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
        </>
    );
}
