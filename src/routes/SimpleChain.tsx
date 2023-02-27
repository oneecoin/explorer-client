import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    Tooltip,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getSummary } from "../api/mempool/simple-chain";
import { ISimpleChainCreateBlock, ISimpleChainSummary } from "../api/mempool/types";
import Helmet from "../components/Helmet";

export default function SimpleChain() {
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const { register, handleSubmit, setValue } = useForm<ISimpleChainCreateBlock>();
    const { data: summary, isLoading: summaryLoading } = useQuery<ISimpleChainSummary>(
        ["simple-chain"],
        getSummary
    );
    return (
        <Box width={"100%"} justifyContent={"center"} display={"flex"}>
            <Helmet title="Simple Blockchain" />
            <HStack width={"100%"} marginTop={"12"} justifyContent={"center"}>
                <Box
                    width={"96"}
                    backgroundColor={boxColor}
                    boxShadow={"lg"}
                    borderRadius={"2xl"}
                    height={"lg"}
                >
                    <VStack
                        alignItems={"start"}
                        paddingTop={"4"}
                        paddingX={"10"}
                        height={"100%"}
                        gap={"2"}
                    >
                        <Heading fontSize={"3xl"} marginBottom={"5"}>
                            Create Your Block
                        </Heading>
                        <FormControl>
                            <FormLabel>height</FormLabel>
                            <Input
                                type={"number"}
                                min={0}
                                isDisabled={true}
                                value={summaryLoading ? 0 : Number(summary?.height) + 1}
                                {...register("block.height")}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>data</FormLabel>
                            <Input type={"text"} {...register("block.data")} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>nonce</FormLabel>
                            <NumberInput min={0} defaultValue={0}>
                                <NumberInputField {...register("block.nonce")} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <Box width={"100%"} paddingTop={"4"}>
                            <Button colorScheme={"blue"}>Auto Increment</Button>
                        </Box>
                        <Box width={"100%"} paddingTop={"3"}>
                            <Button colorScheme={"blue"} variant={"outline"}>
                                Add Block
                            </Button>
                        </Box>
                    </VStack>
                </Box>
                <Box>
                    <VStack gap={"1"}>
                        <Box
                            backgroundColor={boxColor}
                            boxShadow={"lg"}
                            borderRadius={"2xl"}
                            height={"52"}
                            width={"lg"}
                            paddingTop={"4"}
                            paddingX={"10"}
                        >
                            <FormControl>
                                <FormLabel>previous hash</FormLabel>
                                <Input
                                    type={"text"}
                                    isDisabled
                                    value={summary?.latestHash}
                                    {...register("block.prevHash")}
                                />
                            </FormControl>
                            <FormControl marginTop={"3"}>
                                <Tooltip
                                    label={"2개의 0이 있어야 합니다"}
                                    aria-label="hash"
                                    hasArrow
                                >
                                    <FormLabel width={"fit-content"}>hash</FormLabel>
                                </Tooltip>
                                <Input
                                    type={"text"}
                                    isDisabled
                                    {...register("block.hash")}
                                />
                            </FormControl>
                        </Box>
                        <Box
                            backgroundColor={boxColor}
                            boxShadow={"lg"}
                            borderRadius={"2xl"}
                            height={"72"}
                            width={"lg"}
                            paddingTop={"4"}
                            paddingX={"10"}
                        >
                            <FormControl>
                                <Tooltip
                                    label={"for hashing"}
                                    aria-label="public key"
                                    hasArrow
                                >
                                    <FormLabel width={"fit-content"}>
                                        public key
                                    </FormLabel>
                                </Tooltip>
                                <Textarea
                                    fontSize={"xs"}
                                    resize={"none"}
                                    overflow={"hidden"}
                                    maxLength={128}
                                    {...register("block.publicKey")}
                                />
                            </FormControl>
                            <FormControl marginY={"3"}>
                                <Tooltip
                                    label={"for identifying"}
                                    aria-label="private key"
                                    hasArrow
                                >
                                    <FormLabel width={"fit-content"}>
                                        private key
                                    </FormLabel>
                                </Tooltip>
                                <Textarea
                                    fontSize={"md"}
                                    resize={"none"}
                                    overflow={"hidden"}
                                    maxLength={128}
                                    {...register("privateKey")}
                                />
                            </FormControl>
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}
