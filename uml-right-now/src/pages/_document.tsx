import { CssBaseline } from "@nextui-org/react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {

    return (
        <Html lang="en">
            <Head>{CssBaseline.flush()}</Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
