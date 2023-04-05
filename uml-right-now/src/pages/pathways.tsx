// Next
import { useContext, useEffect, useState } from "react";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

// Components
import PathwayHelp from "@/components/PathwayHelp/PathwayHelp";
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import { SpinnerDotted } from "spinners-react";

// Libraries
import DegreePathway from "@/DegreePathway";
import PathwayGenerator from "@/PathwayGenerator";

// Constants
const ROWDY_BLUE_COLOR = "#0369B1";

export default function Pathways() {
    // Contexts
    const { transcript, major } = useContext(TranscriptContext) as TranscriptContextType;
    const [degreePathway, setDegreePathway] = useState<DegreePathway | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (major) { // A major has been provided => generate a degree pathway
            setIsLoading(true);
            PathwayGenerator.generateDegreePathway(major, transcript).then(pathway => {
                setIsLoading(false);
                setDegreePathway(pathway);
            }).catch(err => {
                console.log(err);
            });
        } else { // No major was provided => display a message for the user

        }
    }, [transcript, major]);

    return (
        <main className="
            flex
            flex-col
            justify-start
            items-center
            py-10
            min-h-screen
        ">
            {/* Loading Animation */}
            <SpinnerDotted
                style={{
                    width: "100px"
                }}
                enabled={isLoading}
                speed={100}
                color={ROWDY_BLUE_COLOR}
                className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                "
            />

            {/* Degree Pathway */}
            {degreePathway && (
                <>
                    <h1 className="
                        text-xl
                        mb-10
                        text-center
                        px-5
                        py-2
                        bg-light-gray
                        rounded-xl
                        mx-5
                    ">
                        Your generated pathway for:
                        <br></br>
                        <span className="
                            text-rowdy-blue
                        ">{major}</span>
                    </h1>
                    <PathwayTable degreePathway={degreePathway} />
                </>
            )}

            {/* Help Dialogue */}
            {!isLoading && !degreePathway && <PathwayHelp />}
        </main>
    );
}
