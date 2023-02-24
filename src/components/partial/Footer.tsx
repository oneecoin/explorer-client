import { Box, Link, Text, VStack } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box marginTop={"12"} width={"100%"}>
            <VStack
                marginX={"28"}
                borderTop={"1px"}
                borderColor={"gray.200"}
                fontSize={"large"}
                color={"gray.500"}
                gap={"2"}
                pt={"6"}
                mb={"6"}
            >
                <Text>
                    Made by: <Link href="https://github.com/onee-only">onee-only</Link>
                </Text>
                <Link href="https://github.com/oneecoin">Visit my Repository</Link>
            </VStack>
        </Box>
    );
}
