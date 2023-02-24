import {
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGithub, FaKiwiBird } from "react-icons/fa";

export default function Header() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Box borderBottom={"1px"} borderColor={"gray.200"} width={"100%"} height={"16"}>
            <HStack
                marginX={"28"}
                height={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Link to={"/"}>
                    <HStack fontSize={"4xl"} color={"blue.600"}>
                        <FaKiwiBird />
                        <Text fontSize={"3xl"} color={"blue.500"}>
                            Oneecoin
                        </Text>
                    </HStack>
                </Link>
                <HStack>
                    <Button colorScheme={"blue"} onClick={onOpen}>
                        Get Started
                    </Button>
                    <Button colorScheme={"blue"} variant={"outline"} onClick={onOpen}>
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
