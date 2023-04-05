import * as React from "react";
// Next
import Image from "next/image";
import Link from "next/link";
import { BsFillEnvelopePaperFill, BsLinkedin } from "react-icons/bs";

export default function ImgMediaCard(props) {


    return (
        <div className="justify-center md:inline-grid md:grid-col-3">
            <div className="overflow-y-clip bg-white h-auto m-6 w-auto au shadow-xl hover:drop-shadow-2xl rounded-lg lg:rounded-lg hover:bg-light-gray">
                <div className=" flex flex-col  m-6">
                    <div className=" flex justify-center m-6">
                        <h1 className="italic font-bold text-rowdy-blue">{props.name}</h1>
                    </div>
                    <div className=" flex justify-center m-2">
                        <Image alt="TeamPhoto" className="rounded-full w-20 h-20" src={props.url} />
                    </div>
                </div>
                <div className=" flex justify-center m-2">
                    <h1 className="text-center text-black font-bold text-rowdy-blue ">{props.quote}</h1>
                </div>
                <div className=" flex justify-center m-6">
                    <Link className="bg-rowdy-blue rounded-xl m-6" to="#" href={props.linkedin} >
                        <BsLinkedin className="text-white w-20 h-10 m-2" />
                    </Link>
                    <Link className="bg-rowdy-blue rounded-xl m-6" to="#" href={"mailto:" + props.email} >
                        <BsFillEnvelopePaperFill className="text-white w-20 h-10 m-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
