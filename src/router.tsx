import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Block from "./routes/Block";
import Blocks from "./routes/Blocks";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import Me from "./routes/Me";
import NotFound from "./routes/NotFound";
import SimpleChain from "./routes/SimpleChain";
import Transaction from "./routes/Transaction";
import User from "./routes/User";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "simple-chain",
                element: <SimpleChain />,
            },
            {
                path: "auth/github/confirm",
                element: <GithubConfirm />,
            },
            {
                path: "transactions/:id",
                element: <Transaction />,
            },
            {
                path: "blocks/*",
                children: [
                    {
                        path: "",
                        element: <Blocks />,
                    },
                    {
                        path: ":hash",
                        element: <Block />,
                    },
                ],
            },
            {
                path: "users/*",
                children: [
                    {
                        path: "me",
                        element: <Me />,
                    },
                    {
                        path: ":pk",
                        element: <User />,
                    },
                ],
            },
        ],
    },
]);

export default router;
