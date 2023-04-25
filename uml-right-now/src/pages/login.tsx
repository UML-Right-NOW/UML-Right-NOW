import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { LoginUserParams } from "../types";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const router = useRouter();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const loginUser = async ({email, password} : LoginUserParams) => {
        email = email.toLowerCase();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });
    
        return res;
    };

    const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            const loginRes = await loginUser({email, password});

            if(loginRes && !loginRes.ok) {
                setSubmitError(loginRes.error || "");
            } else {
                router.push("/");
            }

        } catch (error) {
            if(error instanceof AxiosError) {
                const errorMsg = error.response?.data?.error;
                setSubmitError(errorMsg);
            }
        }

        setLoading(false);

    };

    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        setDidMount(true);
    }, []);

    if (!didMount) {
        return null;
    }

    //console.log(submitError);

    return (
        <main>
            {/* Sign in with Google */}
            {/* <Script src="https://accounts.google.com/gsi/client" async defer /> */}

            <div className="mt-20 relative flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-left text-rowdy-blue">Login</h1>
                    <form onSubmit={handleLogin} className="mt-6">

                        <div className="mb-2">
                            <label htmlFor="email" className="block text-m font-semibold">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmailChange} required className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="block text-m font-semibold">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePasswordChange} required className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>

                        {/* <a href="#" className="text-m hover:underline">Forgot Password?</a> */}
                            
                        <div className="mt-6">
                            <PrimaryButton type="submit" disabled={loading} classes="w-40">
                                Login
                            </PrimaryButton>
                        </div>
                    </form>

                    
                    {
                        (submitError != "") &&
                        <p className="mt-8 text-xl text-red-600 text-left">
                            {submitError}
                        </p>
                    }

                    <p className="mt-8 text-m font-light text-left">
                            Need an account?{" "}
                        <a href="sign-up" className="font-medium hover:underline">Sign up</a>
                    </p>

                    {/* <p className="mt-4 text-m font-light text-left">or</p>

                    <p><br></br></p>

                    <div id="g_id_onload w-full"
                        data-client_id="793557852728-bjnm83d8lqunpbpbjl8kqvp976d3aptg.apps.googleusercontent.com"
                        data-login_uri="http://localhost:3000/login"
                        data-auto_prompt="false">
                    </div>
                    <div className="g_id_signin w-40"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-shape="rectangular"
                        data-logo_alignment="left">
                    </div> */}

                </div>
            </div>
        </main>
    );
}