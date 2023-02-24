import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: `'Raleway', sans-serif`,
    },
    initialColorMode: "dark",
    useSystemColorMode: true,
});

export default theme;
