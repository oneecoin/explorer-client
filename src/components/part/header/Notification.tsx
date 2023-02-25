import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Spinner,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../../api/server/inbox";
import { server } from "../../../api/server/server";
import { IMessage } from "../../../api/server/types";

export default function Notification() {
    const { isLoading, data } = useQuery<IMessage[]>(["messages"], getMessages, {
        retry: false,
    });
    const queryClient = useQueryClient();

    const onDeleteAll = () => {
        server.delete("/users/me/inbox");
        queryClient.refetchQueries(["messages"]);
        queryClient.refetchQueries(["tinyMe"]);
    };
    return (
        <>
            {isLoading ? (
                <Spinner size={"lg"} />
            ) : (
                <>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        {data?.map((message) => (
                            <AccordionItem>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        {message.message_type === "system"
                                            ? "시스템"
                                            : "거래"}
                                        : {message.title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>{message.content}</AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <Box justifyContent={"flex-end"} width={"100%"} display={"flex"}>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            marginTop={"2"}
                            colorScheme={"blue"}
                            onClick={onDeleteAll}
                        >
                            모든 메시지 제거
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
}
