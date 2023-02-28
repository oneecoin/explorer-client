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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSimpleChainBlock, getSummary } from "../api/mempool/simple-chain";
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
        reset,
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
    const [isMutating, setIsMutating] = useState(false);
    const [errText, setErrText] = useState("");
    const queryClient = useQueryClient();
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
        setErrText("");
    };
    useEffect(onInputChange, []);

    const onAutoIncrement = async () => {
        setIsIncreasing(true);
    };

    const onSubmit = async (form: ISimpleChainCreateBlock) => {
        setIsMutating(true);
        const status = await createSimpleChainBlock(form);
        switch (status) {
            case "invalid":
                setErrText("블록 또는 key pair가 유효하지 않습니다");
                break;
            case "duplicate":
                setErrText("이미 이 public key로 블록을 만들었습니다");
                break;
            case "ok":
                reset();
                queryClient.refetchQueries({
                    queryKey: ["simple-chain"],
                    exact: true,
                });
                onInputChange();
                break;
        }
        setIsMutating(false);
    };

    useEffect(() => {
        if (isIncreasing) {
            const { hash, nonce } = getValues("block");
            if (hash.startsWith("00")) {
                setIsIncreasing(false);
                trigger();
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
                        <HStack paddingTop={"5"} width={"100%"}>
                            <Box>
                                <Button
                                    colorScheme={"blue"}
                                    variant={"outline"}
                                    isDisabled={!isValid}
                                    onClick={handleSubmit(onSubmit)}
                                    isLoading={isMutating}
                                >
                                    Add Block
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    colorScheme={"blue"}
                                    onClick={onAutoIncrement}
                                    isDisabled={isIncreasing}
                                >
                                    Auto Increment
                                </Button>
                            </Box>
                        </HStack>
                        <Text paddingTop={"3"} fontSize={"md"} color={"red.300"}>
                            {errText !== "" ? errText : null}
                        </Text>
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
                                    fontSize={"xs"}
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
