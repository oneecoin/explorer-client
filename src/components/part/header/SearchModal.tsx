import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: IModalProps) {
    const highlightColor = useColorModeValue("blue.600", "blue.300");
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
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
                            />
                        </InputGroup>
                    </ModalHeader>
                    {/* <ModalBody></ModalBody> */}
                </ModalContent>
            </Modal>
        </>
    );
}
