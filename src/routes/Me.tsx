import {
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    HStack,
    IconButton,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IMe } from "../api/server/types";
import { changeUsername, getMe } from "../api/server/user";
import Helmet from "../components/Helmet";

interface IUsername {
    username: string;
}

export default function Me() {
    const { data, isLoading: userLoading } = useQuery<IMe>(["users", "me"], getMe, {
        refetchOnWindowFocus: false,
    });
    const queryClient = useQueryClient();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { register, handleSubmit, resetField } = useForm<IUsername>();

    const registered = register("username", {
        required: true,
    });

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async ({ username }: IUsername) => {
        setIsLoading(true);
        const status = await changeUsername(username);
        if (status === 406) {
            setIsError(true);
        } else {
            queryClient.refetchQueries(["users", "me"]);
            onClose();
        }
        setIsLoading(false);
    };

    const onEditOpen = () => {
        resetField("username");
        onOpen();
    };

    return (
        <>
            {userLoading ? null : (
                <VStack width={"100%"}>
                    <Helmet title={`My Page`} />
                    <HStack
                        width={"80%"}
                        justifyContent={"space-between"}
                        marginTop={"16"}
                    >
                        <VStack width={1 / 3}>
                            <Box width={"80"}>
                                <Avatar src={data?.avatar} size={"full"} />
                            </Box>
                        </VStack>
                        <VStack width={2 / 3} paddingX={"5"} gap={"3"}>
                            <Text fontSize={"3xl"}>내 정보</Text>
                            <Divider />
                            <VStack
                                alignItems={"start"}
                                width={"100%"}
                                paddingLeft={"8"}
                                gap={"3"}
                            >
                                <Box>
                                    <HStack gap={"2"}>
                                        <Text fontSize={"xl"} color={"gray.500"}>
                                            username
                                        </Text>
                                        <Popover
                                            returnFocusOnClose={false}
                                            isOpen={isOpen}
                                            onClose={onClose}
                                            placement="right"
                                            closeOnBlur={false}
                                        >
                                            <PopoverTrigger>
                                                <IconButton
                                                    aria-label="edit"
                                                    size={"sm"}
                                                    colorScheme={"blue"}
                                                    variant={"outline"}
                                                    icon={<FaEdit />}
                                                    onClick={onEditOpen}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>
                                                    Change Username
                                                </PopoverHeader>
                                                <PopoverBody>
                                                    <FormControl>
                                                        <Input
                                                            isInvalid={isError}
                                                            type={"text"}
                                                            {...registered}
                                                            required
                                                            onChange={(e) => {
                                                                registered.onChange(e);
                                                                setIsError(false);
                                                            }}
                                                        />
                                                        {isError ? (
                                                            <FormErrorMessage>
                                                                username을 사용할 수
                                                                없습니다
                                                            </FormErrorMessage>
                                                        ) : null}
                                                    </FormControl>
                                                </PopoverBody>
                                                <PopoverFooter
                                                    display={"flex"}
                                                    justifyContent={"flex-end"}
                                                    gap={"2"}
                                                >
                                                    <Button
                                                        colorScheme={"blue"}
                                                        onClick={handleSubmit(onSubmit)}
                                                        isLoading={isLoading}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        colorScheme={"blue"}
                                                        variant={"ghost"}
                                                        onClick={onClose}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </PopoverFooter>
                                            </PopoverContent>
                                        </Popover>
                                    </HStack>
                                    <Text fontSize={"2xl"}>{data?.username}</Text>
                                </Box>
                                <Box>
                                    <Text fontSize={"xl"} color={"gray.500"}>
                                        email
                                    </Text>
                                    <Text fontSize={"2xl"}>{data?.email}</Text>
                                </Box>
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            )}
        </>
    );
}
