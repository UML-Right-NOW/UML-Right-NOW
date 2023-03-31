// Next
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Components
import Page from "@/components/Page/Page";

//nextUi
import { NextUIProvider } from '@nextui-org/react';

// Contexts
import HamburgerMenuContextProvider from "@/contexts/HamburgerMenuContext";
import TranscriptContextProvider from "@/contexts/TranscriptContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <TranscriptContextProvider>
                <HamburgerMenuContextProvider>

                    <Page>

                        <Component {...pageProps} />

                    </Page>

                </HamburgerMenuContextProvider>
            </TranscriptContextProvider>
        </NextUIProvider>


    );
}
