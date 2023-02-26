import {
    Box,
    Divider,
    Highlight,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { searchUsers } from "../../../api/server/search";
import { debounceFunction } from "../../../lib/debouncer";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ISearchUser {
    pk: number;
    username: string;
    public_key: string;
}

const debounceDelay = 500; // Delay in milliseconds

export default function SearchModal({ isOpen, onClose }: IModalProps) {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<ISearchUser[]>([]);
    const [input, setInput] = useState("");

    const setTimeoutSearch = useCallback(
        debounceFunction(async (query: string) => {
            if (query !== "") {
                const data = await searchUsers(query);
                setUsers(data.data);
            } else {
                setUsers([]);
            }
            setLoading(false);
        }, debounceDelay),
        []
    );
    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        setLoading(true);
        setTimeoutSearch(event.target.value);
    };

    const myOnclose = () => {
        onClose();
        setUsers([]);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={myOnclose} size={"2xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <InputGroup size={"lg"}>
                            <InputLeftElement
                                pointerEvents={"none"}
                                children={
                                    <Box
                                        color={highlightColor}
                                        fontSize={"2xl"}
                                        position={"relative"}
                                        bottom={"1.5"}
                                        right={"1"}
                                    >
                                        <FaSearch />
                                    </Box>
                                }
                                bottom={0}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Search User.."}
                                variant={"unstyled"}
                                fontSize={"2xl"}
                                onChange={onChange}
                            />
                        </InputGroup>
                    </ModalHeader>
                    {users.length !== 0 || isLoading ? (
                        <ModalBody>
                            {!isLoading ? (
                                <VStack width={"100%"}>
                                    {users.map((user) => (
                                        <Link to={`/users/@${user.pk}`}>
                                            <Box width={"xl"} marginY={"4"}>
                                                <Text isTruncated fontSize={"2xl"}>
                                                    <Highlight
                                                        query={input}
                                                        styles={{
                                                            backgroundColor:
                                                                highlightColor,
                                                            color: "white",
                                                        }}
                                                        children={user.username}
                                                    />
                                                </Text>
                                                <Divider />
                                                <Text isTruncated color={"gray.400"}>
                                                    <Highlight
                                                        query={input}
                                                        styles={{
                                                            backgroundColor:
                                                                highlightColor,
                                                            color: "white",
                                                        }}
                                                        children={user.public_key}
                                                    />
                                                </Text>
                                            </Box>
                                        </Link>
                                    ))}
                                </VStack>
                            ) : (
                                <Box
                                    justifyContent={"center"}
                                    width={"100%"}
                                    display={"flex"}
                                    marginY={"3"}
                                >
                                    <Spinner
                                        size={"xl"}
                                        thickness="5px"
                                        color={highlightColor}
                                    />
                                </Box>
                            )}
                        </ModalBody>
                    ) : null}
                </ModalContent>
            </Modal>
        </>
    );
}
