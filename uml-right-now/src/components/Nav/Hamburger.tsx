// Library
import Page from "@/Page";

// Tailwind
const hamburgerBarClass = `
    bg-white
    w-full
    h-[2px]
`;

// Prop types
type HamburgerProps = {
    pages: Page[]
};

export default function Hamburger({ pages }: HamburgerProps) {
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
        ">
            <div className={hamburgerBarClass}></div>
            <div className={hamburgerBarClass}></div>
            <div className={hamburgerBarClass}></div>
        </div>
    );
}
