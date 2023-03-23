// Next
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Components
import Page from "@/components/Page/Page";

// Contexts
import HamburgerMenuContextProvider from "@/contexts/HamburgerMenuContext";
import StudentInfoContextProvider from "@/contexts/StudentInfoContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StudentInfoContextProvider>
            <HamburgerMenuContextProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </HamburgerMenuContextProvider>
        </StudentInfoContextProvider>
    );
}
