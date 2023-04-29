import { HamburgerMenuContext, HamburgerMenuContextType } from "@/contexts/HamburgerMenuContext";
import { useContext } from "react";

// Tailwind
const hamburgerBarClassBase = `
    bg-white
    w-full
    h-[2px]
    duration-300
`;

export default function Hamburger() {
    // Contexts
    const { hamburgerMenuIsVisible, setHamburgerMenuIsVisible } = useContext(HamburgerMenuContext) as HamburgerMenuContextType;
    
    // Determine the CSS classes of each bar in the hamburger
    let hamburgerBarOneClass = hamburgerBarClassBase;
    let hamburgerBarTwoClass = hamburgerBarClassBase;
    let hamburgerBarThreeClass = hamburgerBarClassBase;
    if (hamburgerMenuIsVisible) {
        // First bar
        hamburgerBarOneClass += `
            rotate-45
            translate-y-[7px]
        `;

        // Second bar
        hamburgerBarTwoClass += `
            hidden
        `;

        // Third bar
        hamburgerBarThreeClass += `
            -rotate-45
            translate-y-[-7px]
        `;
    }

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
            z-[100]
        " onClick={() => setHamburgerMenuIsVisible(!hamburgerMenuIsVisible)}>
            <div className={hamburgerBarOneClass}></div>
            <div className={hamburgerBarTwoClass}></div>
            <div className={hamburgerBarThreeClass}></div>
        </div>
    );
}
