import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
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
                path: "users/me",
                element: <Me />,
            },
            {
                path: "users/:pk",
                element: <User />,
            },
            {
                path: "transactions/:id",
                element: <Transaction />,
            },
            {
                path: "auth/github/confirm",
                element: <GithubConfirm />,
            },
        ],
    },
]);

export default router;
