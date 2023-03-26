import { useState } from "react";
import { FcGraduationCap, FcLeftDown2, FcViewDetails } from "react-icons/fc";
import PathWayGenerated from "../PathwayFolder/PathwaysGenerated.jsx";
import ProfileCard from "../ProfileCard/ProfileCard.jsx";


const SideNav = (props, { arr }) => {
    const [open, setOpen] = useState(true);
    const [whatWasClicked, setwhatWasClicked] = useState(false);
    const Menus = [
        { title: "Account", src: <FcGraduationCap /> },
        { title: "Generated path", src: <FcViewDetails /> }
    ];

    const propsArr = [
        { title: "Computer Science", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Buisness", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Accountant", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Physic", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Math", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "English", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Nursing", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Mars", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " },
        { title: "Phychoogy", text: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " }
    ];
    const user = [
        { UserName: "Dante-Sam", UserLName: "ElNITO", url: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }
    ];

    function handleClick(event) {
        //console.log(event.currentTarget.textContent)
        if (event.currentTarget.textContent == Menus[0].title) {
            setwhatWasClicked(true);
        } else if (event.currentTarget.textContent == Menus[1].title) {
            setwhatWasClicked(false);
        }
        console.log(user)
    }

    function pageToRenderONe() {
        if (whatWasClicked == true) {
            return <div>
                <h1 className="flex justify-center text-rowdy-blue text-center text-lg lg:text-5xl ">Your Info</h1>
                <ProfileCard url={user[0].url} valueN={user[0].UserName} valueL={user[0].UserLName} />;
            </div>
        } else if (whatWasClicked == false) {
            return <div>
                <h1 className="flex justify-center text-rowdy-blue text-center text-lg lg:text-5xl ">Your previous Generated degree path(s)</h1>
                <PathWayGenerated propsArr={propsArr} />
            </div>
        }
    }


    return (
        <div>
            <div className="flex ">
                <div className={` ${open ? "w-72" : "w-20 "} bg-light-gray h-screen p-5  pt-8 relative duration-300`} onMouseEnter={() => setOpen(!open)}>
                    {/* <Image src={logo} className={`absolute cursor-pointer -right-3 top-9 w-4 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} /> */}
                    <FcLeftDown2 className={`absolute cursor-pointer -right-0 top-9 w-4 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                    <div className="flex gap-x-4 items-center">
                        <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >Your Profil</h1>
                    </div>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) => (
                            <li key={index} onClick={handleClick} className={`flex rounded-md p-2 cursor-pointer hover:bg-rowdy-blue text-black text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-gray"} `}>
                                {Menu.src}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-deep-gray h-screen overflow-y-auto">
                    {pageToRenderONe()}
                </div>
            </div>

        </div>

    );
};
export default SideNav;