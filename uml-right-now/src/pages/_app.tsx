import Page from "@/components/Page/Page";
import "@/styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import type { AppProps } from "next/app";

// Contexts
import HamburgerMenuContextProvider from "@/contexts/HamburgerMenuContext";
import TranscriptContextProvider from "@/contexts/TranscriptContext";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <TranscriptContextProvider>
                <HamburgerMenuContextProvider>
                    <SSRProvider>
                        <Page>
                            <Component {...pageProps} />
                        </Page>
                    </SSRProvider>
                </HamburgerMenuContextProvider>
            </TranscriptContextProvider>
        </SessionProvider>
    );
}
