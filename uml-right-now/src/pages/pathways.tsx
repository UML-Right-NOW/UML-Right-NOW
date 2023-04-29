import DegreePathway from "@/classes/DegreePathway";
import PathwayGenerator from "@/classes/PathwayGenerator";
import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
import PathwayHelp from "@/components/PathwayHelp/PathwayHelp";
import PrintPathway from "@/components/PdfFile/Print";
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsBoxArrowRight, BsSave } from "react-icons/bs";
import { SpinnerDotted } from "spinners-react";

// Constants
const ROWDY_BLUE_COLOR = "#0369B1";

// Enums
enum SavePathwayStatus {
    FAILURE,
    SUCCESS
}

export default function Pathways() {
    // Contexts
    const { transcript, major } = useContext(TranscriptContext) as TranscriptContextType;

    // State
    const [degreePathway, setDegreePathway] = useState<DegreePathway | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [savePathwayResult, setSavePathwayResult] = useState({
        message: "",
        result: SavePathwayStatus.FAILURE
    });

    // Auth
    const session = useSession();

    // Router
    const router = useRouter();

    // Initialization
    useEffect(() => {
        if (major) { // A major has been provided => generate a degree pathway
            setIsLoading(true);
            PathwayGenerator.generateDegreePathway(major, transcript).then(pathway => {
                setDegreePathway(pathway);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [transcript, major]);

    // Event handlers
    const onSavePathwayButtonClicked = async () => {
        // Ensure that the user is authenticated and that a pathway exists
        if (session.status !== "authenticated" || !degreePathway) {
            return;
        }

        // Attempt to retrieve the user's email
        const userEmail = session.data.user?.email;
        if (!userEmail) {
            return;
        }

        // Construct the JSON
        const data = JSON.stringify({
            major: major,
            userEmail: userEmail,
            pathway: degreePathway
        });

        // Store the data in the database
        setIsLoading(true);
        await fetch("/api/save-pathway", {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async res => {
            await res.json().then(data => {
                if (data["acknowledged"]) {
                    setSavePathwayResultSuccess();
                } else {
                    setSavePathwayResultFailure();
                }
            }).catch(err => {
                setSavePathwayResultFailure();
                console.log(err);
            });
        }).catch(err => {
            setSavePathwayResultFailure();
            console.log(err);
        });
        setIsLoading(false);
    };
    const onLoginButtonClicked = () => {
        router.push("/login");
    };

    // Helpers
    const setSavePathwayResultFailure = () => {
        setSavePathwayResult({
            message: "Failed to save pathway",
            result: SavePathwayStatus.FAILURE
        });
    };
    const setSavePathwayResultSuccess = () => {
        setSavePathwayResult({
            message: "Pathway saved successfully! View it on the profile page.",
            result: SavePathwayStatus.SUCCESS
        });
    };

    return (
        <main className="
            flex
            flex-col
            justify-start
            items-center
            py-10
        ">
            {/* Loading Animation */}
            {
                isLoading && <div className="
                    w-screen
                    h-screen
                    bg-black
                    bg-opacity-50
                    fixed
                    top-0
                    left-0
                    z-50
                ">
                    <SpinnerDotted
                        style={{
                            width: "100px"
                        }}
                        enabled={isLoading}
                        speed={100}
                        color={ROWDY_BLUE_COLOR}
                        className="
                            fixed
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                        "
                    />
                </div>
            }

            {/* Save/Login Buttons */}
            {degreePathway && (
                <div className="
                    mb-10
                    flex
                    flex-col
                    justify-start
                    items-center
                ">
                    {session.status === "authenticated" ? (
                        <>
                            {/* Save Button */}
                            <PrimaryButton classes="" onClick={onSavePathwayButtonClicked}>
                                Save Your Pathway <BsSave />
                            </PrimaryButton>

                            {/* Save Message */}
                            {savePathwayResult.message && (
                                <p className={
                                    "mx-5 mt-2 text-center " + (savePathwayResult.result === SavePathwayStatus.SUCCESS
                                        ? "text-emerald-500"
                                        : "text-rowdy-red")
                                }>
                                    {savePathwayResult.message}
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Login Dialog */}
                            <p className="
                                mb-2
                            ">
                                Login to save your pathway
                            </p>

                            {/* Login Button */}
                            <PrimaryButton classes="!px-10" onClick={onLoginButtonClicked}>
                                Login <BsBoxArrowRight />
                            </PrimaryButton>
                        </>
                    )}
                </div>
            )}

            {/* Degree Pathway */}
            {degreePathway && <PrintPathway degreePathway={degreePathway} major={major} />}

            {/* Help Dialogue */}
            {!isLoading && !degreePathway && <PathwayHelp />}
        </main>
    );
}
