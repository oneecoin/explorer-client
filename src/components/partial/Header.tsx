import {
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
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCoins, FaCrow, FaGithub } from "react-icons/fa";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

export default function Header() {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const logoColor = useColorModeValue("blue.600", "blue.300");
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(BsSunFill, BsFillMoonFill);
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Box borderBottom={"1px"} borderColor={borderColor} width={"100%"} height={"16"}>
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
                    <IconButton
                        color={"gray.500"}
                        onClick={toggleColorMode}
                        variant={"ghost"}
                        aria-label="Toggle dark mode"
                        icon={<Icon />}
                    />
                </HStack>
                <HStack>
                    <Button colorScheme={"blue"} onClick={onOpen}>
                        Get Started
                    </Button>
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
