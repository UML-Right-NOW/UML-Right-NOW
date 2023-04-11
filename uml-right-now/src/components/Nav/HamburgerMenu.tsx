import PageInfo from "@/PageInfo";
import { HamburgerMenuContext, HamburgerMenuContextType } from "@/contexts/HamburgerMenuContext";
import Link from "next/link";
import { useContext } from "react";
import SignOutButton from "../Inputs/Buttons/SignOutButton";
import { useSession } from "next-auth/react";

// Types
type HamburgerMenuProps = {
    pages: PageInfo[]
};

export default function HamburgerMenu({ pages }: HamburgerMenuProps) {
    // State
    const session = useSession();

    // Contexts
    const { setHamburgerMenuIsVisible } = useContext(HamburgerMenuContext) as HamburgerMenuContextType;

    // Assemble nav items
    const navItems = pages.map(page => {
        return (
            <li key={page.name + "-hamburger"}>
                <Link href={page.link}>{page.name}</Link>
            </li>
        );
    });

    return (
        // Hamburger Menu Container
        <div className="
            absolute
            top-0
            left-0
            w-screen
            h-screen
            flex
            z-40
        ">
            {/* Translucent Overlay */}
            <div className="
                bg-black/75
                w-1/2
                sm:w-2/3
                h-full
                hover:cursor-pointer
                -translate-x-full
                animate-[slide-in_200ms_ease-in-out_forwards]
            " onClick={() => setHamburgerMenuIsVisible(false)}>
            </div>

            {/* Menu */}
            <div className="
                bg-rowdy-blue
                w-1/2
                sm:w-1/3
                h-full
                flex
                justify-center
                items-top
                pt-20
                overflow-y-auto
                translate-x-full
                animate-[slide-in_200ms_ease-in-out_forwards]
            ">
                {/* Nav Items */}
                <ul className="
                    text-white
                    text-center
                    [&>li]:mb-5
                    sm:[&>li]:mb-10
                ">
                    {navItems}
                    {session.status === "authenticated" && <SignOutButton />}
                </ul>
            </div>
        </div>
    );
}
