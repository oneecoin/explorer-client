import {
    Box,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ITransactionCreateForm } from "../api/mempool/types";
import Helmet from "../components/Helmet";

export default function CreateTransaction() {
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const {} = useForm<ITransactionCreateForm>();

    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Helmet title="Transfer Coin" />
            <HStack marginTop={"12"}>
                <Box
                    paddingX={"8"}
                    paddingY={"4"}
                    backgroundColor={boxColor}
                    boxShadow={"lg"}
                    borderRadius={"2xl"}
                    width={"2xl"}
                    height={"lg"}
                >
                    <Text fontSize={"3xl"}>Transfer Your Coin</Text>
                    <Divider marginY={"4"} />
                    <FormControl>
                        <FormLabel>Receiver Public Key</FormLabel>
                        <Textarea resize={"none"} overflow={"hidden"} />
                        <FormHelperText>코인을 받는 지갑의 public key</FormHelperText>
                    </FormControl>
                    <FormControl marginTop={"4"}>
                        <FormLabel>Sender Private Key</FormLabel>
                        <Textarea resize={"none"} overflow={"hidden"} />
                        <FormHelperText>코인을 보내는 지갑의 private key</FormHelperText>
                    </FormControl>
                </Box>
                <Box
                    paddingX={"8"}
                    paddingY={"4"}
                    backgroundColor={boxColor}
                    boxShadow={"lg"}
                    borderRadius={"2xl"}
                    width={"xs"}
                    height={"lg"}
                >
                    <Box
                        marginTop={"6"}
                        borderWidth={"1px"}
                        borderRadius={"lg"}
                        paddingX={"4"}
                        paddingY={"4"}
                        height={"28"}
                    >
                        <Text fontSize={"2xl"}>Your Balance</Text>
                        <Text fontSize={"xl"} marginTop={"3"}>
                            532
                        </Text>
                    </Box>
                    <FormControl marginTop={"4"}>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput size={"lg"}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>보낼 금액</FormHelperText>
                    </FormControl>
                </Box>
            </HStack>
        </Box>
    );
}
