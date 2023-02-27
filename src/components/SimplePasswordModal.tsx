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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ISimplePassword } from "../api/server/types";
import { createSimplePassword } from "../api/server/wallet";

interface ISimpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SimplePasswordModal({ isOpen, onClose }: ISimpModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<ISimplePassword>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (form: ISimplePassword) => {
        setIsLoading(true);
        const status = await createSimplePassword(form);
        setIsLoading(false);
        if (status !== 406) {
            myOnclose();
        } else {
            setError("private_key", { message: "", type: "value" });
        }
    };

    const myOnclose = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={myOnclose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>간편 비밀번호 설정</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>간편 비밀번호</FormLabel>
                        <Input
                            type={"password"}
                            {...register("simple_password", {
                                maxLength: 32,
                            })}
                            maxLength={32}
                        />
                        <FormHelperText>길이는 32자까지 제한됩니다</FormHelperText>
                    </FormControl>
                    <FormControl marginTop={"3"} isInvalid={Boolean(errors.private_key)}>
                        <FormLabel>private key</FormLabel>
                        <Textarea
                            height={"48"}
                            resize={"none"}
                            {...register("private_key")}
                            maxLength={300}
                        />
                        {Boolean(errors.private_key) ? (
                            <FormErrorMessage>
                                private key가 유효하지 않습니다
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>
                </ModalBody>
                <ModalFooter gap={"2"}>
                    <Button
                        colorScheme={"blue"}
                        onClick={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                    >
                        설정
                    </Button>
                    <Button variant={"ghost"} onClick={myOnclose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
