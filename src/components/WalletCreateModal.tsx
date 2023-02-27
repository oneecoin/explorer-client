import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createWallet } from "../api/mempool/wallet";
import { IWalletCandidate } from "../api/server/types";
import { createSimplePassword, replaceWallet } from "../api/server/wallet";

interface IWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WalletCreateModal({ isOpen, onClose }: IWalletModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IWalletCandidate>();
    const [isLoading, setIsLoading] = useState(false);
    const [isAutoLoading, setIsAutoLoading] = useState(false);
    const queryClient = useQueryClient();

    const onSubmit = async (form: IWalletCandidate) => {
        setIsLoading(true);
        const valid = await replaceWallet(form);
        setIsLoading(false);
        if (valid) {
            queryClient.refetchQueries({ queryKey: ["users", "me"], exact: true });
            myOnclose();
        } else {
            setError("root", { message: "", type: "value" });
        }
    };

    const onAutoCreation = async () => {
        setIsAutoLoading(true);
        const wallet = await createWallet();
        setValue("private_key", wallet.privateKey);
        setValue("public_key", wallet.publicKey);
        setIsAutoLoading(false);
    };

    const myOnclose = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={myOnclose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>지갑 재생성</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Button
                        width={"100%"}
                        marginY={"5"}
                        colorScheme={"blue"}
                        variant={"outline"}
                        isLoading={isAutoLoading}
                        onClick={onAutoCreation}
                    >
                        자동 생성
                    </Button>
                    <FormControl isInvalid={Boolean(errors.root)}>
                        <FormLabel>public key</FormLabel>
                        <Textarea
                            height={"28"}
                            resize={"none"}
                            {...register("public_key")}
                            maxLength={128}
                        />
                    </FormControl>
                    <FormControl marginTop={"3"} isInvalid={Boolean(errors.root)}>
                        <FormLabel>private key</FormLabel>
                        <Textarea
                            height={"48"}
                            resize={"none"}
                            {...register("private_key")}
                            maxLength={300}
                        />
                        {Boolean(errors.root) ? (
                            <FormErrorMessage>잘못된 key pair 입니다</FormErrorMessage>
                        ) : null}
                    </FormControl>
                </ModalBody>
                <ModalFooter gap={"2"}>
                    <Button
                        colorScheme={"blue"}
                        onClick={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                    >
                        생성
                    </Button>
                    <Button variant={"ghost"} onClick={myOnclose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
