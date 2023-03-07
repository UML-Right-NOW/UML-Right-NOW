// Next
import { useContext } from "react";

// Contexts
import { HamburgerMenuContext, HamburgerMenuContextType } from "@/contexts/HamburgerMenuContext";

// Tailwind
const hamburgerBarClass = `
    bg-white
    w-full
    h-[2px]
`;

export default function Hamburger() {
    // Contexts
    const { hamburgerMenuIsVisible, setHamburgerMenuIsVisible } = useContext(HamburgerMenuContext) as HamburgerMenuContextType;

    return (
        <div className="
            md:hidden
            w-6
            h-4
            flex
            flex-col
            justify-between
            items-center
            hover:cursor-pointer
            z-50
        " onClick={() => setHamburgerMenuIsVisible(!hamburgerMenuIsVisible)}>
            <div className={hamburgerBarClass}></div>
            <div className={hamburgerBarClass}></div>
            <div className={hamburgerBarClass}></div>
        </div>
    );
}
