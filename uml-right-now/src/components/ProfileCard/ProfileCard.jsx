import { Input } from "@nextui-org/react";
import AvatarComp from "../Avatar/AvatarComp.jsx";

export default function ProfileCard(props) {
    return (
        <div className="h-auto w-96 m-4 lg:h-40  rounded-2xl flex flex-col lg:flex-row content-center items-center bg-light-gray">
            <div className="m-3">
                <AvatarComp name={props.name} url={props.url} />
            </div>

            <div aria-label="Close" className="bg-deep-grey m-5 rounded-2xl" >
                <Input aria-label="Close" id="YOUR_FIXED_ID" className="m-3" placeholder="Enter your name" value={props.valueN} />
                <Input aria-label="Close" id="YOUR_FIXED_ID2" className="m-3" placeholder="Enter your last name" value={props.valueL} />
            </div>

        </div>
    );
}
