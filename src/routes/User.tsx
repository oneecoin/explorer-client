import {
    Avatar,
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    IconButton,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FaCheck, FaRegCopy, FaUserAltSlash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IPublicUser } from "../api/server/types";
import { getUser } from "../api/server/user";
import Helmet from "../components/Helmet";
import { debounceFunction } from "../lib/debouncer";

export default function User() {
    const { pk } = useParams();
    const [isCopied, setIsCopied] = useState(false);
    const { isError, isLoading, data } = useQuery<IPublicUser>(["users", pk], getUser, {
        refetchOnWindowFocus: false,
    });

    const setTimeoutCopy = useCallback(
        debounceFunction(() => {
            setIsCopied(false);
        }, 1500),
        []
    );

    const onCopyClick = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(data!.public_key);
        setTimeoutCopy(null);
    };

    return (
        <>
            {!isLoading ? (
                <>
                    {!isError ? (
                        <Box width={"100%"} height={"xl"}>
                            <Helmet title={`${data.username}`} />
                            <VStack marginX={"12"} gap={"4"}>
                                <Box
                                    width={"52"}
                                    height={"52"}
                                    marginTop={"12"}
                                    marginBottom={"4"}
                                >
                                    <Avatar size={"full"} src={data.avatar} />
                                </Box>
                                <Text fontSize={"3xl"}>{data.username}</Text>
                                <HStack color={"gray.500"} marginTop={"6"}>
                                    <Text>public key</Text>
                                    <IconButton
                                        colorScheme={isCopied ? "green" : "blue"}
                                        variant={"ghost"}
                                        aria-label="Copy public key"
                                        icon={isCopied ? <FaCheck /> : <FaRegCopy />}
                                        onClick={onCopyClick}
                                    />
                                </HStack>
                                <Text>{data.public_key}</Text>
                                <Link
                                    to={`/transactions/create?publicKey=${data.public_key}`}
                                >
                                    <Button colorScheme={"blue"}>코인 전송하기</Button>
                                </Link>
                            </VStack>
                        </Box>
                    ) : (
                        <VStack
                            display={"flex"}
                            justifyContent={"center"}
                            width={"100%"}
                            height={"lg"}
                        >
                            <Helmet title={`User Not Found`} />
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
                    height={"xl"}
                >
                    <Helmet title={`Loading...`} />
                    <Spinner size={"xl"} thickness={"5px"} />
                    <Heading>Loading User..</Heading>
                </VStack>
            )}
        </>
    );
}
