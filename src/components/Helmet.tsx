import { Helmet as ReactHelmet } from "react-helmet";

interface IHelmetProps {
    title: string;
}

export default function Helmet({ title }: IHelmetProps) {
    return (
        <ReactHelmet>
            <title>Oneecoin - {title}</title>
            <link rel="icon" type="image/svg+xml" href="favicon.svg" sizes="16x16" />
        </ReactHelmet>
    );
}
