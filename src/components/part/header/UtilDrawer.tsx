import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";

interface IDrawerProps {
    ref: React.MutableRefObject<null>;
    isOpen: boolean;
    onClose: () => void;
}

export default function UtilDrawaer({ ref, isOpen, onClose }: IDrawerProps) {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={ref}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody></DrawerBody>

                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
