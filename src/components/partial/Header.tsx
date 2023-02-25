import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBell, FaCoins, FaCrow, FaGithub } from "react-icons/fa";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { useTinyUser } from "../../api/server/auth";
import { BellIcon } from "@chakra-ui/icons";

export default function Header() {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const logoColor = useColorModeValue("blue.600", "blue.300");
    const headerColor = useColorModeValue("white", "gray.800");
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(BsSunFill, BsFillMoonFill);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isLoggedIn, userLoading, user } = useTinyUser();
    return (
        <Box
            borderBottom={"1px"}
            borderColor={borderColor}
            backgroundColor={headerColor}
            width={"100%"}
            height={"16"}
            position={"sticky"}
            top={"0"}
            zIndex={"5"}
        >
            <HStack
                marginX={"28"}
                height={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <HStack gap={"8"}>
                    <Link to={"/"}>
                        <HStack fontSize={"4xl"} color={logoColor}>
                            <FaCrow />
                            <Text fontSize={"3xl"} color={logoColor}>
                                Oneecoin
                            </Text>
                        </HStack>
                    </Link>
                </HStack>
                <HStack>
                    <IconButton
                        color={"gray.500"}
                        onClick={toggleColorMode}
                        variant={"ghost"}
                        aria-label="Toggle dark mode"
                        icon={<Icon />}
                    />
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
                                            <Box fontSize={"xl"} position={"relative"}>
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
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Notification</PopoverHeader>
                                            <PopoverBody>
                                                <Accordion
                                                    defaultIndex={[0]}
                                                    allowMultiple
                                                >
                                                    <AccordionItem>
                                                        <AccordionButton>
                                                            <Box
                                                                as="span"
                                                                flex="1"
                                                                textAlign="left"
                                                            >
                                                                Section 1 title
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                        <AccordionPanel pb={4}>
                                                            Lorem ipsum dolor sit amet,
                                                            consectetur adipiscing elit,
                                                            sed do eiusmod tempor
                                                            incididunt ut labore et dolore
                                                            magna aliqua. Ut enim ad minim
                                                            veniam, quis nostrud
                                                            exercitation ullamco laboris
                                                            nisi ut aliquip ex ea commodo
                                                            consequat.
                                                        </AccordionPanel>
                                                    </AccordionItem>
                                                </Accordion>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </HStack>
                            </>
                        )
                    ) : null}

                    <Button
                        colorScheme={"blue"}
                        variant={"outline"}
                        leftIcon={<FaCoins />}
                    >
                        Become a Miner
                    </Button>
                </HStack>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up or Sign In</ModalHeader>
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
        </Box>
    );
}
