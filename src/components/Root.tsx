import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header/Header";

export default function Root() {
    return (
        <Box justifyContent={"center"} width={"100%"} minWidth={"1519"}>
            <Header />
            <Box marginX={"28"}>
                <Outlet />
            </Box>
            <Footer />
            <ReactQueryDevtools />
        </Box>
    );
}
