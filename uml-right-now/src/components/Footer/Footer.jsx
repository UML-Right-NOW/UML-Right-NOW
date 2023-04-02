
import Link from "next/link";



export default function Footer() {
    const getYear = new Date().getFullYear();

    // I hardcoded here boys
    return (
        <div className="h-auto bg-rowdy-blue flex flex-col h-36 overflow-hidden  lg:flex-row">
            <div className="flex flex-col m-6 justify-center w-full">
                <h1 className="text-white text-center ">© {getYear} UML Right Now, All rights reserved</h1>
                <Link className="bg-rowdy-blue rounded-xl m-6" to="#" href="/aboutus" >
                    <h1 className="text-white text-center font-bold underline m-6">About Us</h1>
                </Link>

            </div>
        </div>
    )

}










