import PageInfo from "@/classes/PageInfo";
import { HamburgerMenuContext, HamburgerMenuContextType } from "@/contexts/HamburgerMenuContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import logo from "../../../assets/logo.png";
import SignOutButton from "../Inputs/Buttons/SignOutButton";
import Hamburger from "./Hamburger";
import HamburgerMenu from "./HamburgerMenu";

// Tailwind
const navItemsClass = `
    hidden 
    md:flex
    text-white
    items-center
    w-[300px]
`;

// Types
type NavProps = {
    pages: PageInfo[]
};

export default function Nav({ pages }: NavProps) {
    // Contexts
    const { hamburgerMenuIsVisible } = useContext(HamburgerMenuContext) as HamburgerMenuContextType;

    // State
    const session = useSession();

    // Assemble nav items
    const navItems = pages.map(page => {
        return (
            <li key={page.name}>
                <Link href={page.link}>{page.name}</Link> 
            </li>
        );
    });

    // Split the nav items into left and right sides
    const mid = Math.floor(navItems.length / 2) + (session.status === "authenticated" ? 1 : 0);
    const navItemsLeft = navItems.slice(0, mid);
    const navItemsRight = navItems.slice(mid);

    return (
        <nav className="
            bg-rowdy-blue
            w-full
            h-14
            md:h-20
            flex
            items-center
            px-10
            md:px-20
            justify-between
            md:justify-center
            sticky
            top-0
            z-[80]
            shadow-md
        ">
            {/* Nav Items Left */}
            <ul className={`
                ${navItemsClass}
                justify-end
                [&>li]:ml-6
                lg:[&>li]:ml-10
            `}>
                {navItemsLeft}
            </ul>

            {/* Logo */}
            <Link href="/" className="
                md:mx-14
            ">
                <div className="
                    relative
                    w-10
                    h-10
                    md:w-16
                    md:h-16
                ">
                    <Image 
                        src={logo} 
                        alt="UML Right NOW Logo" 
                        fill
                        sizes="100%"
                    />
                </div>
            </Link>

            {/* Nav Items Right */}
            <ul className={`
                ${navItemsClass}
                justify-start
                [&>li]:mr-4
                lg:[&>li]:mr-10
            `}>
                {navItemsRight}
                {session.status === "authenticated" && <SignOutButton />}
            </ul>

            {/* Hamburger */}
            <Hamburger />

            {/* Hamburger Menu */}
            {hamburgerMenuIsVisible && <HamburgerMenu pages={pages} />}
        </nav>
    );
}
