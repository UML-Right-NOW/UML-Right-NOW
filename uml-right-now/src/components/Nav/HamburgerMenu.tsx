import PageInfo from "@/PageInfo";
import { HamburgerMenuContext, HamburgerMenuContextType } from "@/contexts/HamburgerMenuContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import SignOutButton from "../Inputs/Buttons/SignOutButton";

// Types
type HamburgerMenuProps = {
    pages: PageInfo[]
};

export default function HamburgerMenu({ pages }: HamburgerMenuProps) {
    // Contexts
    const { setHamburgerMenuIsVisible } = useContext(HamburgerMenuContext) as HamburgerMenuContextType;

    // State
    const session = useSession();

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
            right-0
            w-[200px]
            flex
            z-[90]
        " onClick={() => setHamburgerMenuIsVisible(false)}>
            {/* Menu */}
            <div className="
                bg-rowdy-blue
                w-full
                flex
                justify-center
                items-top
                pt-20
                pb-5
                rounded-b-xl
                shadow-2xl
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
