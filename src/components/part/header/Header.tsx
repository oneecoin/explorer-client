import {
    Box,
    Button,
    HStack,
    IconButton,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCoins, FaCrow } from "react-icons/fa";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import UserBar from "./UserBar";

export default function Header() {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const logoColor = useColorModeValue("blue.600", "blue.300");
    const headerColor = useColorModeValue("white", "gray.800");
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(BsSunFill, BsFillMoonFill);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <UserBar />
                    <Button
                        colorScheme={"blue"}
                        variant={"outline"}
                        leftIcon={<FaCoins />}
                    >
                        Become a Miner
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
}
