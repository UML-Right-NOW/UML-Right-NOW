import Page from "@/components/Page/Page";
import HamburgerMenuContextProvider from "@/contexts/HamburgerMenuContext";
import TranscriptContextProvider from "@/contexts/TranscriptContext";
import "@/styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

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
