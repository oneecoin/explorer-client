import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

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
                path: "auth/github/confirm",
                element: <GithubConfirm />,
            },
        ],
    },
]);

export default router;
