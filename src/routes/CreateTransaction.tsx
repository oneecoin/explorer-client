import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
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
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createMempoolTransaction } from "../api/mempool/transaction";
import { getBalance } from "../api/mempool/wallet";
import { ITransactionCreateForm } from "../api/mempool/types";
import { useTinyUser } from "../api/server/auth";
import Helmet from "../components/Helmet";
import { createTransactionCount } from "../api/server/transaction";
import { getPrivateKeyBySimplePassword } from "../api/server/wallet";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateTransaction() {
    const searchParams = new URLSearchParams(document.location.search);
    const queryClient = useQueryClient();
    const boxColor = useColorModeValue("#fdfdfd", "#1f2634");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoggedIn, user, userLoading } = useTinyUser();
    const [isLoading, setLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [userBalance, setUserBalance] = useState(-1);
    const [simpInput, setSimpInput] = useState("");
    const [simpLoading, setSimpLoading] = useState(false);
    const [simpError, setSimpError] = useState(false);
    const cancelRef = React.useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { isValid },
    } = useForm<ITransactionCreateForm>();

    useEffect(() => {
        const getUserBalance = async () => {
            const data = await getBalance(user!.public_key);
            setUserBalance(data.balance);
        };
        getUserBalance();
    }, [user]);

    const onSubmit = async (form: ITransactionCreateForm) => {
        setLoading(true);
        const valid = await createMempoolTransaction(form);
        if (!valid) {
            setIsInvalid(true);
        } else {
            createTransactionCount(form.to, form.amount);
            queryClient.refetchQueries({
                queryKey: ["tinyMe"],
                exact: true,
            });
            reset();
            onClose();
        }
        setLoading(false);
    };

    const onSimplePasswordSubmit = async () => {
        setSimpLoading(true);
        const privateKey = await getPrivateKeyBySimplePassword(simpInput);
        if (privateKey !== "") {
            setValue("privateKey", privateKey);
        } else {
            setSimpError(true);
        }
        setSimpLoading(false);
    };

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
                        <Textarea
                            defaultValue={searchParams.get("publicKey") ?? ""}
                            resize={"none"}
                            overflow={"hidden"}
                            {...register("to", {
                                required: true,
                            })}
                        />
                        <FormHelperText>????????? ?????? ????????? public key</FormHelperText>
                    </FormControl>
                    <FormControl marginTop={"4"}>
                        <FormLabel>Sender Private Key</FormLabel>
                        <Textarea
                            resize={"none"}
                            overflow={"hidden"}
                            {...register("privateKey", {
                                required: true,
                            })}
                        />
                        <FormHelperText>????????? ????????? ????????? private key</FormHelperText>
                    </FormControl>
                    <Box marginTop={"6"}>
                        <Popover placement="right">
                            <PopoverTrigger>
                                <Button
                                    colorScheme={"blue"}
                                    variant={"outline"}
                                    isDisabled={userLoading || !isLoggedIn}
                                >
                                    ?????? ???????????? ??????
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody>
                                    <Input
                                        marginTop={"4"}
                                        size={"lg"}
                                        type={"password"}
                                        maxLength={32}
                                        value={simpInput}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setSimpInput(event.target.value);
                                            setSimpError(false);
                                        }}
                                    />
                                    <Text marginTop={"4"} color={"red.400"}>
                                        {simpError
                                            ? "??????????????? ???????????? ????????????"
                                            : null}
                                    </Text>
                                    <Box
                                        width={"100%"}
                                        display={"flex"}
                                        justifyContent={"end"}
                                    >
                                        <Button
                                            marginTop={"4"}
                                            colorScheme={"blue"}
                                            onClick={onSimplePasswordSubmit}
                                            isLoading={simpLoading}
                                        >
                                            ???????????? ????????????
                                        </Button>
                                    </Box>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
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
                        <Box fontSize={"xl"} marginTop={"3"}>
                            {userLoading || !isLoggedIn || userBalance === -1 ? (
                                <Text color={"gray.500"}>unknown</Text>
                            ) : (
                                <Text>{userBalance}</Text>
                            )}
                        </Box>
                    </Box>
                    <FormControl marginTop={"24"}>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput
                            size={"lg"}
                            min={0}
                            defaultValue={0}
                            inputMode={"numeric"}
                        >
                            <NumberInputField
                                {...register("amount", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>?????? ??????</FormHelperText>
                    </FormControl>
                    <Button
                        marginTop={"12"}
                        colorScheme={"blue"}
                        onClick={onOpen}
                        isDisabled={!isValid}
                    >
                        ?????? ????????????
                    </Button>
                </Box>
            </HStack>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
                size={"xl"}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Confirm Transaction</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Text fontSize={"xl"}>
                            ????????? ??? ????????? ????????? ?????????????????????????
                        </Text>
                        <Text marginTop={"5"} color={"red.300"}>
                            ?????? ????????? ???????????? ????????? ?????? ????????? ????????? ????????? ???
                            ????????????.
                        </Text>
                        <Text
                            marginTop={"7"}
                            height={"7"}
                            color={"red.300"}
                            fontSize={"md"}
                        >
                            {isInvalid
                                ? "private key ?????? amount??? ???????????? ????????? ?????? mempool??? ????????? ???????????????."
                                : null}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            colorScheme={"blue"}
                            onClick={handleSubmit(onSubmit)}
                            isLoading={isLoading}
                        >
                            ????????????
                        </Button>
                        <Button
                            marginLeft={"5"}
                            variant={"ghost"}
                            onClick={onClose}
                            ref={cancelRef}
                        >
                            ??????
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    );
}
