import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./partial/Footer";
import Header from "./partial/Header";

export default function Root() {
    return (
        <Box>
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
}
