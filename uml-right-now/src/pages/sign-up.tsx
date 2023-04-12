import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { LoginUserParams } from "../types";

export default function SignUp() {
    //sign in data
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    //Loading state, router, error messages
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<string>("");

    const loginUser = async ({email, password} : LoginUserParams) => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });
    
        return res;
    };

    function containsUppercase(str: string) {
        return /[A-Z]/.test(str);
    }

    function containsNumber(str: string) {
        return /\d/.test(str);
    }

    function containsSpecialChars(str: string) {
        const specialChars =
          // eslint-disable-next-line no-useless-escape
          /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    //Function validates data passed in by user. Returns boolean based on whether data entered was okay or not
    const validateData = (): boolean => {
        let err = "";

        if(data.password?.length < 10) {
            err = "Password should be at least 10 characters long";
        } else if (data.password !== data.confirmPassword) {
            err = "Passwords don't match";
        } else if (!containsUppercase(data.password)) {
            err = "Password should contain a capital letter";
        } else if (!containsNumber(data.password)) {
            err = "Password should contain a number";
        } else if (!containsSpecialChars(data.password)) {
            err = "Password should contain a special character";
        }

        setValidationErrors(err);

        if(err.length > 0) {
            return false;
        } else {
            return true;
        }

    };

    //Function runs when form has been submitted
    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //Validate data.  If data is good, sign up user and route to home page
        const isValid = validateData();
        if(isValid) {
            try {
                setLoading(true);
                const apiRes = await axios.post("/api/auth/signup", data);

                if(apiRes?.data?.success) {
                    const loginRes = await loginUser({
                        email: data.email,
                        password: data.password
                    });
                    if(loginRes && !loginRes.ok) {
                        setSubmitError(loginRes.error || "");
                    }else {
                        router.push("/");
                    }

                }

            } catch (error: unknown) {
                if(error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error;
                    setSubmitError(errorMsg);
                }
            }
            setLoading(false);
        }
    };

    //Every time an input field is changed, add the character to the data value
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setData({...data, [event.target.name]: event.target.value});
    };
    
    //Prevent hydration errors  ¯\_(ツ)_/¯ 
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        setDidMount(true);
    }, []);

    if (!didMount) {
        return null;
    }

    console.log(submitError);

    return (
        <main>
            {/* Sign in with Google */}
            <Script src="https://accounts.google.com/gsi/client" async defer />

            <div className="mt-20 relative flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-left text-rowdy-blue">Sign Up</h1>
                    <form onSubmit={handleSignup} className="mt-6">

                        <div className="mb-2">
                            <label htmlFor="email"className="block text-m font-semibold">Email</label>
                            <input type="email" name="email" value={data.email} onChange={handleInputChange} required className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="block text-m font-semibold">Password</label>
                            <input type="password" name="password" value={data.password} onChange={handleInputChange} required className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="verifyPassword" className="block text-m font-semibold">Re-Enter Password</label>
                            <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={handleInputChange} required className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>

                        <div className="mt-2 mb-2 text-xs">
                            <p>Password must be at least 10 characters</p>
                            <p>Password must contain at least one capital letter</p>
                            <p>Password must contain at least one number</p>
                            <p>Password must contain at least one special character, i.e. !@#$%^&*</p>
                        </div>

                        <a href="#" className="text-m hover:underline">Forgot Password?</a>
                            
                        <div className="mt-6">
                            <PrimaryButton type="submit" disabled={loading} classes="w-56">
                                Create Account
                            </PrimaryButton>
                        </div>
                    </form>

                    {
                        (submitError != "") &&
                        <p className="mt-8 text-xl text-red-600 text-left">
                            {submitError}
                        </p>
                    }

                    {
                        (validationErrors != "") &&
                        <p className="mt-8 text-xl text-red-600 text-left">
                            {validationErrors}
                        </p>
                    }

                    <p className="mt-8 text-m font-light text-left">
                            Already have an account?{" "}
                        <a href="login" className="font-medium hover:underline">Login</a>
                    </p>

                    <p className="mt-4 text-m font-light text-left">or</p>

                    <p><br></br></p>

                    <div id="g_id_onload"
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
                    </div>

                </div>
            </div>
        </main>
    );
}