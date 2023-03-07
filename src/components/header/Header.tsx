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
import { FaBars, FaCrow, FaInfoCircle, FaSearch } from "react-icons/fa";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import UserBar from "./UserBar";
import UtilDrawaer from "./UtilDrawer";
import SearchModal from "./SearchModal";

export default function Header() {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const logoColor = useColorModeValue("blue.600", "blue.300");
    const headerColor = useColorModeValue("white", "gray.800");
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const { toggleColorMode } = useColorMode();
    const Icon = useColorModeValue(BsSunFill, BsFillMoonFill);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isSearchOpen,
        onOpen: onSearchOpen,
        onClose: onSearchClose,
    } = useDisclosure();

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
                <HStack gap={"16"}>
                    <Link to={"/"}>
                        <HStack fontSize={"4xl"} color={logoColor}>
                            <FaCrow />
                            <Text fontSize={"3xl"}>Oneecoin</Text>
                        </HStack>
                    </Link>
                    <Button
                        leftIcon={<FaSearch />}
                        color={"gray.500"}
                        backgroundColor={boxColor}
                        width={"80"}
                        justifyContent={"start"}
                        variant={"outline"}
                        onClick={onSearchOpen}
                    >
                        Search User...
                    </Button>
                    <SearchModal isOpen={isSearchOpen} onClose={onSearchClose} />
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
                        leftIcon={<FaInfoCircle />}
                        as="a"
                        href="https://github.com/oneecoin/.github/blob/main/profile/README.md"
                    >
                        Documentation
                    </Button>
                    <IconButton
                        aria-label="bar"
                        icon={<FaBars />}
                        colorScheme={"blue"}
                        onClick={onOpen}
                    />
                    <UtilDrawaer isOpen={isOpen} onClose={onClose} />
                </HStack>
            </HStack>
        </Box>
    );
}
