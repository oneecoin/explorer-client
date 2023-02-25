import {
    Button,
    Code,
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

const codes: string[] = [
    "printf('Oneecoin');",
    "print('Oneecoin')",
    "console.log('Oneecoin');",
    "fmt.Println('Oneecoin')",
    "System.out.println('Oneecoin');",
    "println('Oneecoin')",
];

export default function UtilDrawaer({ ref, isOpen, onClose }: IDrawerProps) {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={ref}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Code variant={"subtle"}>
                        {codes[Math.floor(Math.random() * codes.length)]}
                    </Code>
                </DrawerHeader>

                <DrawerBody></DrawerBody>

                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
