import { Box, Heading, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import Helmet from "../components/Helmet";

export default function SimpleChain() {
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    return (
        <Box width={"100%"}>
            <Helmet title="Simple Blockchain" />
            <HStack height={"md"} width={"90%"} marginTop={"12"}>
                <Box width={3 / 5} height={"100%"}></Box>
                <Box width={2 / 5} backgroundColor={boxColor} height={"100%"}>
                    <VStack alignItems={"start"} paddingTop={"4"} paddingLeft={"6"}>
                        <Heading fontSize={"3xl"}>Create your Block</Heading>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}
