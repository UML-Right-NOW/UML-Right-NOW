import React, { ReactNode } from "react";

// Types
type PrimaryButtonProps = {
    children: ReactNode,
    type?: "button" | "submit" | "reset",
    classes?: string,
    onClick?: () => void,
    disabled?: boolean
};

export default function PrimaryButton(props: PrimaryButtonProps) {
    return (
        <button className={`
            ${props.classes}
            bg-rowdy-blue
            text-white
            text-lg
            text-center
            px-4
            py-2
            rounded-full
            flex
            justify-center
            items-center
            border-2
            border-rowdy-blue
            [&>*]:ml-2
            hover:bg-white
            hover:text-rowdy-blue
            duration-[0.2s]
        `} type={props.type || "button"} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}
