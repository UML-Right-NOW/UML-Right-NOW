import PageInfo from "@/PageInfo";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/logo.png";
import Hamburger from "./Hamburger";

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
    // Assemble nav items
    const navItems = pages.map(page => {
        return (
            <li key={page.name}>
                <Link href={page.link}>{page.name}</Link> 
            </li>
        );
    });

    // Split the nav items into left and right sides
    const mid = Math.floor(navItems.length / 2);
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
                    />
                </div>
            </Link>

            {/* Nav Items Right */}
            <ul className={`
                ${navItemsClass}
                justify-start
                [&>li]:mr-6
                lg:[&>li]:mr-10
            `}>
                {navItemsRight}
            </ul>

            {/* Hamburger */}
            <Hamburger />
        </nav>
    );
}
