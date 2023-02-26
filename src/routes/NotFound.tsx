import { Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";

export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Helmet title="Not Found" />
            <Heading marginBottom={"2"}>404 Not Found</Heading>
            <Link to="/">
                <Button colorScheme={"blue"}>돌아가기</Button>
            </Link>
        </VStack>
    );
}
