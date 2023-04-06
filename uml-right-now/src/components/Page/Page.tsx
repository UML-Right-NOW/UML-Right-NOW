import PageInfo from "@/PageInfo";
import { HamburgerMenuContext, HamburgerMenuContextType } from "@/contexts/HamburgerMenuContext";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ReactNode, useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import HamburgerMenu from "../Nav/HamburgerMenu";
import Nav from "../Nav/Nav";

// Types
type PageProps = {
    children: ReactNode
};

// Pages
const defaultPages = [
    new PageInfo("Home", "/"),
    new PageInfo("Pathways", "/pathways"),
    new PageInfo("Help", "help"),
    new PageInfo("About", "about-us"),
];
const loggedOutPages = [
    new PageInfo("Login", "/login")
];
const loggedInPages = [
    new PageInfo("Profile", "profile")
];

export default function Page({ children }: PageProps) {
    // State
    const [pages, setPages] = useState<PageInfo[]>([]);

    // Auth
    const session = useSession();

    // Contexts
    const { hamburgerMenuIsVisible } = useContext(HamburgerMenuContext) as HamburgerMenuContextType;

    useEffect(() => {
        // Initialize the array of pages
        const newPages = session.status === "authenticated"
            ? defaultPages.concat(loggedInPages)
            : defaultPages.concat(loggedOutPages);

        // Set the pages
        setPages(newPages);
    }, [session]);

    return (
        <>
            {/* Document Head */}
            <Head>
                <title>UML Right NOW</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Nav Bar */}
            <Nav pages={pages} />

            {/* Hamburger Menu */}
            {hamburgerMenuIsVisible && <HamburgerMenu pages={pages} />}

            {/* Hamburger Menu */}
            {children}

            {/* Footer */}
            <Footer />
        </>
    );
}
