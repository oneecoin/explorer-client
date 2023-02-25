import { Box } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Footer from "./part/Footer";
import Header from "./part/header/Header";

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
