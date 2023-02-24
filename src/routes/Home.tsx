import { Box, Heading, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import Chart from "../components/partial/Chart";

export default function Home() {
    return (
        <Box mt={"12"}>
            <HStack justifyContent={"center"}>
                <Chart />
            </HStack>
        </Box>
    );
}
