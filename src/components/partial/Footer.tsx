import { Box, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";

export default function Footer() {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    return (
        <Box marginTop={"12"} width={"100%"}>
            <VStack
                marginX={"28"}
                borderTop={"1px"}
                borderColor={borderColor}
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
