import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Button,
    HStack,
    Avatar,
    Text,
    Box,
    VStack,
} from "@chakra-ui/react";
import Notification from "./Notification";
import { useTinyUser } from "../../api/server/auth";
import { FaBell, FaGithub } from "react-icons/fa";

export default function UserBar() {
    const { isLoggedIn, userLoading, user } = useTinyUser();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            {!userLoading ? (
                !isLoggedIn ? (
                    <Button colorScheme={"blue"} onClick={onOpen}>
                        Get Started
                    </Button>
                ) : (
                    <>
                        <HStack paddingRight={"6"}>
                            <Avatar size={"sm"} src={user?.avatar} />
                            <Text>{user?.username}</Text>
                            <Popover>
                                <PopoverTrigger>
                                    <Box
                                        fontSize={"xl"}
                                        position={"relative"}
                                        cursor={"pointer"}
                                    >
                                        <FaBell />
                                        {user?.message_count !== 0 ? (
                                            <Box
                                                rounded={"full"}
                                                width={"4"}
                                                height={"4"}
                                                position={"absolute"}
                                                top={"-0.5"}
                                                right={"-2"}
                                                bgColor={"red.300"}
                                                color={"white"}
                                                fontSize={"xs"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                display={"flex"}
                                            >
                                                <Text marginBottom={"0.5"}>
                                                    {user?.message_count}
                                                </Text>
                                            </Box>
                                        ) : null}
                                    </Box>
                                </PopoverTrigger>
                                <PopoverContent width={"96"}>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Notification</PopoverHeader>
                                    <PopoverBody>
                                        <Notification />
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                    </>
                )
            ) : null}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Get Started</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack mt={"5"}>
                            <Text marginBottom={"5"}>
                                Oneecoin은 Github OAuth만을 지원합니다
                            </Text>
                            <Button
                                width={"80%"}
                                height="12"
                                fontSize={"larger"}
                                leftIcon={<FaGithub />}
                                as={"a"}
                                href="https://github.com/login/oauth/authorize?client_id=ca1e5d368fa75972f138&scope=read:user,user:email"
                            >
                                Continue
                            </Button>
                        </VStack>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
