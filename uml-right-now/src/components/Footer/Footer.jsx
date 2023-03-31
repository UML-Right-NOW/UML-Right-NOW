
//import logo from "../../../assets/logo.png";
import AvatarWithDopDown from "../../components/Avatar/AvatarWithDropDown";

export default function Footer() {
    const getYear = new Date().getFullYear();
    const user = [
        { UserName: "Dante-Sam", UserLName: "ElNITO", url: "../../../assets/logo.png" }
    ];

    return (
        <div className="h-28 bg-light-gray flex flex-row">
            <div className="flex flex-row pt-10 w-full justify-center">
                <h1 >@ {getYear} UML now, All rights reserved</h1>
            </div>
            <div className="flex flex-col mr-20 w-auto bg-black bg-opacity-30 border-rowdy-blue border-4">
                <div>
                    <h1 className="text-white text-center">Meet the Team? Click on!</h1>
                </div>
                <div className="flex flex-row flex-nowrap ">
                    {console.log(user[0].url)}
                    <AvatarWithDopDown />
                    <AvatarWithDopDown />
                    <AvatarWithDopDown />
                    <AvatarWithDopDown />
                </div>

            </div>
        </div>
    )

}