import { QueryFunctionContext } from "@tanstack/react-query";
import { server } from "./server";

export async function getTransactionCount({ queryKey }: QueryFunctionContext) {
    const [_, scope] = queryKey;
    const data = await server.get("/transactions/count", {
        params: {
            scope: scope,
        },
    });
    return data.data;
}

export async function createTransactionCount(receiver: string, amount: number) {
    try {
        await server.post("/transactions", {
            receiver,
            amount,
        });
    } catch (e) {}
}
