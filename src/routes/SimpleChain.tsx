import {
    Box,
    Button,
    FormControl,
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSummary } from "../api/mempool/simple-chain";
import { ISimpleChainCreateBlock, ISimpleChainSummary } from "../api/mempool/types";
import Helmet from "../components/Helmet";
import { hashBlock } from "../lib/hash-block";

export default function SimpleChain() {
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { isValid, errors },
    } = useForm<ISimpleChainCreateBlock>({
        mode: "onChange",
        defaultValues: {
            block: {
                data: "",
                hash: "",
                height: 0,
                nonce: 0,
                prevHash: "",
                publicKey: "",
            },
            privateKey: "",
        },
    });
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [myNonce, setMyNonce] = useState(0);
    const { data: summary, isLoading: summaryLoading } = useQuery<ISimpleChainSummary>(
        ["simple-chain"],
        getSummary
    );

    useEffect(() => {
        if (summary !== undefined) {
            setValue("block.height", Number(summary?.height) + 1);
            setValue("block.prevHash", summary!.latestHash);
        }
    }, [summary]);

    const onInputChange = () => {
        const { block } = getValues();
        setValue("block.hash", hashBlock(block), { shouldValidate: true });
    };
    useEffect(onInputChange, []);

    const onAutoIncrement = async () => {
        setIsIncreasing(true);
    };

    useEffect(() => {
        if (isIncreasing) {
            const { hash, nonce } = getValues("block");
            if (hash.startsWith("00")) {
                setIsIncreasing(false);
                trigger();
                console.log(errors);
            } else {
                setMyNonce(nonce + 1);
                setValue("block.nonce", nonce + 1);
                onInputChange();
            }
        }
    }, [isIncreasing, myNonce]);

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
                                isDisabled
                                {...register("block.height", {
                                    required: true,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>data</FormLabel>
                            <Input
                                type={"text"}
                                {...register("block.data", {
                                    required: true,
                                    onChange: onInputChange,
                                })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>nonce</FormLabel>
                            <NumberInput
                                min={0}
                                defaultValue={0}
                                onChange={(
                                    valueAsString: string,
                                    valueAsNumber: number
                                ) => {
                                    setValue("block.nonce", valueAsNumber);
                                    setMyNonce(valueAsNumber);
                                    onInputChange();
                                }}
                                value={getValues("block.nonce")}
                            >
                                <NumberInputField
                                    {...register("block.nonce", {
                                        required: true,
                                        onChange: onInputChange,
                                        min: 0,
                                        valueAsNumber: true,
                                    })}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <Box width={"100%"} paddingTop={"4"}>
                            <Button
                                colorScheme={"blue"}
                                onClick={onAutoIncrement}
                                isDisabled={isIncreasing}
                            >
                                Auto Increment
                            </Button>
                        </Box>
                        <Box width={"100%"} paddingTop={"3"}>
                            <Button
                                colorScheme={"blue"}
                                variant={"outline"}
                                isDisabled={!isValid}
                            >
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
                                    {...register("block.prevHash", {
                                        required: true,
                                    })}
                                />
                            </FormControl>
                            <FormControl marginTop={"3"}>
                                <FormLabel
                                    display={"flex"}
                                    gap={"3"}
                                    alignItems={"baseline"}
                                >
                                    <Text>hash</Text>
                                    <Text fontSize={"xs"} color={"gray.500"}>
                                        should start with two 0
                                    </Text>
                                </FormLabel>
                                <Input
                                    type={"text"}
                                    isDisabled
                                    {...register("block.hash", {
                                        required: true,
                                        validate: (value, _) => {
                                            return value.startsWith("00");
                                        },
                                    })}
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
                                    {...register("block.publicKey", {
                                        required: true,
                                        maxLength: 128,
                                        onChange: onInputChange,
                                    })}
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
                                    maxLength={242}
                                    {...register("privateKey", {
                                        required: true,
                                        maxLength: 242,
                                    })}
                                />
                            </FormControl>
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}
