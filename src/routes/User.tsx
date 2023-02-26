import { Box, Button, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaUserAltSlash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IPublicUser } from "../api/server/types";
import { getUser } from "../api/server/user";
import Helmet from "../components/Helmet";

export default function User() {
    const { pk } = useParams();
    const { isError, isLoading, data } = useQuery<IPublicUser>(["users", pk], getUser, {
        refetchOnWindowFocus: false,
    });
    return (
        <>
            {!isLoading ? (
                <>
                    {!isError ? (
                        <></>
                    ) : (
                        <VStack
                            display={"flex"}
                            justifyContent={"center"}
                            width={"100%"}
                            height={"lg"}
                        >
                            <Box fontSize={"5xl"}>
                                <FaUserAltSlash />
                            </Box>
                            <Heading>User Not Found</Heading>
                            <Link to="/">
                                <Button colorScheme={"blue"}>돌아가기</Button>
                            </Link>
                        </VStack>
                    )}
                </>
            ) : (
                <VStack
                    display={"flex"}
                    justifyContent={"center"}
                    width={"100%"}
                    height={"lg"}
                >
                    <Helmet title={`Loading...`} />
                    <Spinner size={"xl"} thickness={"5px"} />
                    <Heading>Loading User..</Heading>
                </VStack>
            )}
        </>
    );
}
