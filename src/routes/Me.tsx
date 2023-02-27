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
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMe } from "../api/server/types";
import { changeUsername, getMe } from "../api/server/user";
import Helmet from "../components/Helmet";
import SimplePasswordModal from "../components/SimplePasswordModal";

interface IUsername {
    username: string;
}

export default function Me() {
    const { data, isLoading: userLoading } = useQuery<IMe>(["users", "me"], getMe, {
        refetchOnWindowFocus: false,
    });
    const queryClient = useQueryClient();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        isOpen: isSimpModalOpen,
        onClose: onSimpModalClose,
        onOpen: onSimpModalOpen,
    } = useDisclosure();
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
            <VStack gap={"32"}>
                <Helmet title={`My Page`} />
                <HStack
                    width={"80%"}
                    marginX={"auto"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                    marginTop={"16"}
                >
                    <VStack width={1 / 3} gap={"6"}>
                        <Box width={"80"}>
                            {userLoading ? (
                                <SkeletonCircle width={"80"} height={"80"} />
                            ) : (
                                <Avatar src={data?.avatar} size={"full"} />
                            )}
                        </Box>
                        <Skeleton isLoaded={!userLoading}>
                            <Link to={`/users/${data?.pk}`}>
                                <Button variant={"link"} colorScheme={"blue"}>
                                    공용 프로필 보기
                                </Button>
                            </Link>
                        </Skeleton>
                    </VStack>
                    <VStack width={2 / 3} paddingX={"5"} gap={"16"}>
                        <Box width={"100%"}>
                            <Text fontSize={"3xl"} textAlign={"center"}>
                                내 정보
                            </Text>
                            <Divider />
                            <VStack
                                alignItems={"start"}
                                width={"100%"}
                                paddingLeft={"8"}
                                marginTop={"6"}
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
                                                    isLoading={userLoading}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>
                                                    Change Username
                                                </PopoverHeader>
                                                <PopoverBody>
                                                    <FormControl isInvalid={isError}>
                                                        <Input
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
                                    {userLoading ? (
                                        <Skeleton fontSize={"xl"}>
                                            this is username hehe
                                        </Skeleton>
                                    ) : (
                                        <Text fontSize={"2xl"}>{data?.username}</Text>
                                    )}
                                </Box>
                                <Box>
                                    <Text fontSize={"xl"} color={"gray.500"}>
                                        email
                                    </Text>
                                    {userLoading ? (
                                        <Skeleton fontSize={"xl"}>
                                            this is emaileeeeeeeeeeeee
                                        </Skeleton>
                                    ) : (
                                        <Text fontSize={"2xl"}>{data?.email}</Text>
                                    )}
                                </Box>
                                <Box>
                                    <Text fontSize={"xl"} color={"gray.500"}>
                                        balance
                                    </Text>
                                    {userLoading ? (
                                        <Skeleton fontSize={"xl"}>this is</Skeleton>
                                    ) : (
                                        <Text fontSize={"2xl"}>302</Text>
                                    )}
                                </Box>
                            </VStack>
                        </Box>
                        <Box width={"100%"}>
                            <Text fontSize={"3xl"} textAlign={"center"}>
                                지갑
                            </Text>
                            <Divider />
                            <VStack
                                alignItems={"start"}
                                width={"100%"}
                                paddingLeft={"8"}
                                marginTop={"6"}
                                gap={"3"}
                            >
                                <Box width={"100%"}>
                                    <Text fontSize={"xl"} color={"gray.500"}>
                                        public key
                                    </Text>
                                    {userLoading ? (
                                        <Skeleton fontSize={"xl"}>
                                            this is publickey this is freaking longlong
                                        </Skeleton>
                                    ) : (
                                        <Text fontSize={"2xl"} isTruncated>
                                            {data?.wallet.public_key}
                                        </Text>
                                    )}
                                </Box>
                                <Box width={"100%"}>
                                    <Text fontSize={"xl"} color={"gray.500"}>
                                        hashed private key
                                    </Text>
                                    {userLoading ? (
                                        <Skeleton fontSize={"xl"}>
                                            this is publickey this is freaking longlong
                                        </Skeleton>
                                    ) : (
                                        <Text fontSize={"2xl"} isTruncated>
                                            {data?.wallet.private_key_hash}
                                        </Text>
                                    )}
                                </Box>
                                <Skeleton isLoaded={!userLoading}>
                                    <HStack gap={"3"}>
                                        <Button
                                            colorScheme={"blue"}
                                            onClick={onSimpModalOpen}
                                        >
                                            간편 비밀번호 설정
                                        </Button>
                                        <Button>지갑 관리</Button>
                                    </HStack>
                                </Skeleton>
                                <SimplePasswordModal
                                    onClose={onSimpModalClose}
                                    isOpen={isSimpModalOpen}
                                />
                            </VStack>
                        </Box>
                    </VStack>
                </HStack>
                <Box width={"80%"}>
                    <VStack>
                        <Skeleton isLoaded={!userLoading}>
                            <Button colorScheme={"blue"} variant={"outline"} size={"lg"}>
                                거래 내역 보기
                            </Button>
                        </Skeleton>
                    </VStack>
                </Box>
            </VStack>
        </>
    );
}
