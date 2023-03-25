import { useState } from "react";
import logo from "../../../assets/logo.png";

const SideNav = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Generated path", src: "Pathway" },
        { title: "Account", src: "Acount" }
    ];

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-light-gray h-screen p-5  pt-8 relative duration-300`}
            >
                <img src={logo} className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <div className="flex gap-x-4 items-center">
                    <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >Account</h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-rowdy-blue text-black text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-gray"} `}>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                            <Link href="/">Home</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen bg-rowdy-blue flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div>
        </div>
    );
};
export default SideNav;