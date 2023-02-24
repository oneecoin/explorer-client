import { Button, Heading, VStack } from "@chakra-ui/react";

export default function NotFound() {
    return (
        <VStack justifyContent={"center"} minH={"100vh"}>
            <Heading marginBottom={"2"}>페이지가 존재하지 않습니다</Heading>
            <Button colorScheme={"blue"}>돌아가기</Button>
        </VStack>
    );
}
