import Link from "next/link";

export default function Footer() {
    const getYear = new Date().getFullYear();

    // I hardcoded here boys
    return (
        <div className="bg-rowdy-blue p-6 h-36 overflow-hidden flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full text-white text-center">
                <p className="text-xs mb-5">© {getYear} UML Right Now, All rights reserved</p>
                <Link href="/about-us" className="text-lg underline">
                    Meet the Team
                </Link>
            </div>
        </div>
    );
}
