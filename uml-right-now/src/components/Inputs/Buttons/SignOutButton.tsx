import { signOut } from "next-auth/react";
import PrimaryButton from "./PrimaryButton";

export default function SignOutButton() {
    // Event handlers
    const handleSignOutButtonClicked = async () => {
        signOut({ callbackUrl: "/" });    
    };

    return (
        <PrimaryButton classes="
            !bg-white
            !border-white
            !text-rowdy-blue
            hover:!bg-rowdy-blue
            hover:!text-white
            !text-[16px]
            !px-3
            !py-1
        " onClick={handleSignOutButtonClicked}>
            Sign Out
        </PrimaryButton>
    );
}
