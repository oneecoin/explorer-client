import { Box, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { server } from "../api/server/server";

export default function GithubConfirm() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            const { status, data } = await server.post("/auth/github", { code });
            if (status === 200) {
                localStorage.setItem("exp", data.auth.exp);
                localStorage.setItem("accessToken", data.auth.access);
                queryClient.refetchQueries(["tinyMe"]);
                navigate("/");
            }
        }
    };

    useEffect(() => {
        confirmLogin();
    });
    return (
        <VStack justifyContent={"center"} my={40}>
            <Box fontSize={"6xl"}>
                <FaGithub />
            </Box>
            <Heading>Processing..</Heading>
            <Text>잠시만 기다려 주세요</Text>
            <Spinner size="lg" />
        </VStack>
    );
}
