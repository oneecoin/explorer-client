import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./partial/Footer";
import Header from "./partial/Header";

export default function Root() {
    return (
        <Box justifyContent={"center"} width={"100%"} minWidth={"1700px"}>
            <Header />
            <Box marginX={"28"}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}
