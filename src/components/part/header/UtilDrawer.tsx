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
import React from "react";
import { FaCoins, FaUser } from "react-icons/fa";
import { GoDatabase, GoRadioTower } from "react-icons/go";
import { useTinyUser } from "../../../api/server/auth";

interface IDrawerProps {
    ref: React.MutableRefObject<null>;
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
];

export default function UtilDrawaer({ ref, isOpen, onClose }: IDrawerProps) {
    const { isLoggedIn } = useTinyUser();
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={ref}>
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
                            <Text fontSize={"2xl"}>계정 관리</Text>
                            <Box color={highlightColor}>
                                <FaUser />
                            </Box>
                        </HStack>
                        <Box height={"36"}>
                            {isLoggedIn ? (
                                <>
                                    <VStack spacing={"3"}>
                                        <Button width={"100%"}>내 정보</Button>
                                        <Button
                                            width={"100%"}
                                            variant={"ghost"}
                                            colorScheme={"pink"}
                                        >
                                            로그아웃
                                        </Button>
                                    </VStack>
                                </>
                            ) : (
                                <>
                                    <Text>로그인 되어있지 않습니다..</Text>
                                    <Button width={"100%"} marginTop={"3"}>
                                        Oneecoin 시작하기
                                    </Button>
                                </>
                            )}
                        </Box>
                        <HStack fontSize={"xl"} marginBottom={"3"}>
                            <Text fontSize={"2xl"}>블록체인</Text>
                            <Box color={highlightColor}>
                                <GoDatabase />
                            </Box>
                        </HStack>
                        <VStack spacing={"3"} marginBottom={"12"}>
                            <Button
                                width={"100%"}
                                leftIcon={<FaCoins />}
                                colorScheme={"blue"}
                            >
                                코인 전송하기
                            </Button>
                            <Button width={"100%"}>블록체인 보기</Button>
                            <Button width={"100%"}>블록체인 체험하기</Button>
                        </VStack>
                        <HStack fontSize={"xl"} marginBottom={"3"}>
                            <Text fontSize={"2xl"}>네트워크</Text>
                            <Box color={highlightColor}>
                                <GoRadioTower />
                            </Box>
                        </HStack>
                        <Button width={"100%"} colorScheme={"blue"} variant={"outline"}>
                            채굴자 되기
                        </Button>
                    </Box>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
