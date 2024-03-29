import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGraduationCap, FcLeftDown2, FcViewDetails } from "react-icons/fc";
import PathWayGenerated from "../PathwayFolder/PathwaysGenerated.jsx";
// import PathWayTable from "../PathwayTable/PathwayTable";
import ProfileCard from "../ProfileCard/ProfileCard.jsx";


const SideNav = () => {
    const [open, setOpen] = useState(false);
    const [whatWasClicked, setwhatWasClicked] = useState(false);
    const [data, setData] = React.useState([]);
    const [dataUser, setdataUser] = React.useState([]);

    useEffect(() => {
        axios.get("/api/retrieve-pathway")
            .then(response => {
                setData(response.data.data[0]);
                setdataUser(response.data.data[1]);
                //console.log(response.data.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const Menus = [
        { title: "Account", src: <FcGraduationCap /> },
        { title: "Generated path", src: <FcViewDetails /> }
    ];

    // console.log(data.at(0).pathway);
    function handleClick(event) {
        if (event.currentTarget.textContent == Menus[0].title) {
            setwhatWasClicked(true);
        } else if (event.currentTarget.textContent == Menus[1].title) {
            setwhatWasClicked(false);
        }
    }

    function pageToRenderONe() {
        if (whatWasClicked == true) {
            return <div>
                <h1 className="flex justify-center text-rowdy-blue text-center text-base lg:text-3xl ">-User Info-</h1>
                <ProfileCard name={dataUser.email} email={dataUser.email} />;
            </div>;
        } else if (whatWasClicked == false) {
            return <div>
                <h1 className="flex justify-center text-rowdy-blue text-center text-base lg:text-3xl ">Your previous Generated degree path(s)</h1>
                <PathWayGenerated propsArr={data} pathways={data} />
            </div>;
        }
    }

    return (
        <div>
            <div className="flex ">
                <div className={` ${open ? "w-72" : "w-20 "} bg-light-gray h-screen p-5  pt-8 relative duration-300`} >
                    <FcLeftDown2 className={`absolute cursor-pointer -right-0 top-9 w-4 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                    <div className="flex gap-x-4 items-center">
                        <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >Your Profile</h1>
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