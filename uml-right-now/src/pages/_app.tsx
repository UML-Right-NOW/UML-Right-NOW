// Next
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Components
import Page from "@/components/Page/Page";

//nextUi

import { SSRProvider } from '@react-aria/ssr';

// Contexts
import HamburgerMenuContextProvider from "@/contexts/HamburgerMenuContext";
import TranscriptContextProvider from "@/contexts/TranscriptContext";


export default function App({ Component, pageProps }: AppProps) {
    return (

        <TranscriptContextProvider>
            <HamburgerMenuContextProvider>

                <Page>
                    <SSRProvider>
                        <Component {...pageProps} />
                    </SSRProvider>
                </Page>
            </HamburgerMenuContextProvider>
        </TranscriptContextProvider>

    );
}
