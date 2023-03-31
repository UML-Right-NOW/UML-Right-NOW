
//import logo from "../../../assets/logo.png";
import anderson from "../../../assets/anderson.jpg";
import john from "../../../assets/john.jpg";
import logo from "../../../assets/logo.png";
import sam from "../../../assets/sam.jpg";
import AvatarWithDopDown from "../../components/Avatar/AvatarWithDropDown";


export default function Footer() {
    const getYear = new Date().getFullYear();
    const user = [
        { UserName: "Dante-Sam", UserLName: "ElNITO", url: "../../../assets/logo.png" }
    ];

    // I hardcoded here boys
    return (
        <div className="h-auto bg-rowdy-blue flex flex-col overflow-hidden lg:flex-row">
            <div className="flex flex-row pt-10 w-full justify-center">

                <h1 className="text-white">@ {getYear} UML now, All rights reserved</h1>

            </div>

            <div className="flex flex-col justify-center overflow-hidden lg:mr-20 w-auto bg-black bg-opacity-30 border-rowdy-blue border-4">
                <div>
                    <h1 className="text-white text-center">Meet the Team? Click US!</h1>
                </div>
                <div className="flex flex-row  overflow-hidden">
                    <AvatarWithDopDown name="Anderson Torres" linkIn="https://www.linkedin.com/in/elnito/" email="ato.orte@gmail.com" url={anderson} />
                    <AvatarWithDopDown name="Sam Claflin" linkIn="https://www.linkedin.com/in/SamClaflin/" email="samclaflin7@gmail.com" url={sam} />
                    <AvatarWithDopDown name="John Youte" linkIn="https://www.linkedin.com/in/john-youte-2162391b8" email="johneyoute@gmail.com" url={john} />
                    <AvatarWithDopDown name="Dante Suarez" linkIn="https://www.linkedin.com/in/dante-suarez/" email="ComingSoon.e=gmail.xom" url={logo} />
                </div>
            </div>

        </div>
    )

}