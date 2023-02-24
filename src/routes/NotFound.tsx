import { Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Heading marginBottom={"2"}>404 Not Found</Heading>
            <Link to="/">
                <Button colorScheme={"blue"}>돌아가기</Button>
            </Link>
        </VStack>
    );
}
