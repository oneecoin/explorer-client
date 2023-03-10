import {
    Box,
    Button,
    Code,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaCoins, FaGithub, FaUser } from "react-icons/fa";
import { GoDatabase, GoRadioTower } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useTinyUser } from "../../api/server/auth";
import { server } from "../../api/server/server";

interface IDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const codes: string[] = [
    "printf('Oneecoin');",
    "print('Oneecoin')",
    "console.log('Oneecoin');",
    "fmt.Println('Oneecoin')",
    "System.out.println('Oneecoin');",
    "println('Oneecoin')",
    "Console.WriteLine('Oneecoin');",
];

export default function UtilDrawaer({ isOpen, onClose }: IDrawerProps) {
    const { isLoggedIn, userLoading } = useTinyUser();
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    const queryClient = useQueryClient();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onLogout = async () => {
        setLoading(true);
        await server.get("/auth/logout");
        localStorage.removeItem("exp");
        localStorage.removeItem("access");
        onClose();
        queryClient.refetchQueries({ queryKey: ["messages"], exact: true });
        queryClient.refetchQueries({ queryKey: ["tinyMe"], exact: true });
        setLoading(false);
        navigate("/");
    };

    const goTo = (url: string) => {
        onClose();
        navigate(url);
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth={"1px"}>
                    <Code variant={"subtle"}>
                        {codes[Math.floor(Math.random() * codes.length)]}
                    </Code>
                </DrawerHeader>

                <DrawerBody>
                    <Box marginTop={"8"}>
                        <HStack fontSize={"xl"} marginBottom={"3"}>
                            <Text fontSize={"2xl"}>?????? ??????</Text>
                            <Box color={highlightColor}>
                                <FaUser />
                            </Box>
                        </HStack>
                        <Box height={"36"}>
                            {!userLoading ? (
                                <>
                                    {isLoggedIn ? (
                                        <>
                                            <VStack spacing={"3"}>
                                                <Button
                                                    width={"100%"}
                                                    onClick={() => {
                                                        goTo("/users/me");
                                                    }}
                                                >
                                                    ??? ??????
                                                </Button>
                                                <Button
                                                    width={"100%"}
                                                    variant={"ghost"}
                                                    colorScheme={"pink"}
                                                    onClick={onLogout}
                                                    isLoading={isLoading}
                                                >
                                                    ????????????
                                                </Button>
                                            </VStack>
                                        </>
                                    ) : (
                                        <>
                                            <Text>????????? ???????????? ????????????</Text>
                                            <Button
                                                width={"100%"}
                                                marginTop={"3"}
                                                leftIcon={<FaGithub />}
                                                as={"a"}
                                                href="https://github.com/login/oauth/authorize?client_id=ca1e5d368fa75972f138&scope=read:user,user:email"
                                            >
                                                Oneecoin ????????????
                                            </Button>
                                        </>
                                    )}
                                </>
                            ) : null}
                        </Box>
                        <HStack fontSize={"xl"} marginBottom={"3"}>
                            <Text fontSize={"2xl"}>????????????</Text>
                            <Box color={highlightColor}>
                                <GoDatabase />
                            </Box>
                        </HStack>
                        <VStack spacing={"3"} marginBottom={"12"}>
                            <Button
                                width={"100%"}
                                leftIcon={<FaCoins />}
                                colorScheme={"blue"}
                                onClick={() => {
                                    goTo("/transactions/create");
                                }}
                            >
                                ?????? ????????????
                            </Button>
                            <Button
                                width={"100%"}
                                onClick={() => {
                                    goTo("/blocks");
                                }}
                            >
                                ???????????? ??????
                            </Button>
                            <Button
                                width={"100%"}
                                onClick={() => {
                                    goTo("/simple-chain");
                                }}
                            >
                                ???????????? ????????????
                            </Button>
                        </VStack>
                        <HStack fontSize={"xl"} marginBottom={"3"}>
                            <Text fontSize={"2xl"}>????????????</Text>
                            <Box color={highlightColor}>
                                <GoRadioTower />
                            </Box>
                        </HStack>
                        <Button
                            width={"100%"}
                            colorScheme={"blue"}
                            variant={"outline"}
                            as="a"
                            href="https://github.com/oneecoin/.github/blob/main/profile/README.md"
                            isDisabled
                        >
                            ???????????? ????????????
                        </Button>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
