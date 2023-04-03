// Next
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Components
import Page from "@/components/Page/Page";

// Contexts
import HamburgerMenuContextProvider from "@/contexts/HamburgerMenuContext";
import TranscriptContextProvider from "@/contexts/TranscriptContext";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <TranscriptContextProvider>
                <HamburgerMenuContextProvider>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </HamburgerMenuContextProvider>
            </TranscriptContextProvider>
        </SessionProvider>
    );
}
