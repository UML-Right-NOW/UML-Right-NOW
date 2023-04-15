import DegreePathway from "@/DegreePathway";
import PathwayGenerator from "@/PathwayGenerator";
import PathwayHelp from "@/components/PathwayHelp/PathwayHelp";
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";
import { useContext, useEffect, useState } from "react";
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
    const [ShowPathway, PrintVersion] = useState(true);
    // allow to change from the pintable vertion to the default
    const toggleVersions = () => {
        PrintVersion(!ShowPathway);
    };
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
                    <button className=" bg-rowdy-blue
            text-white 
            text-lg 
            text-center
            sm:px-3 sm:py-1
            md:px-2 md:py-1
            lg:px-6 lg:py-3
            rounded-full 
            flex 
            justify-center
            items-center
            border-2
             border-rowdy-blue
            [&>*]:ml-2
            hover:bg-white
            hover:text-rowdy-blue
            duration-[0.2s]" onClick={toggleVersions}>{!ShowPathway ? "Show Web-View" : "Show Printable"}</button>
                    {ShowPathway ? 
                        // web-view version
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
                            <PathwayTable degreePathway={degreePathway} 
                            /> 
                        </>
                        : //printable version
                        <PrintPathway degreePathway={degreePathway} major={major} />}
                </>
                
            )}

            {/* Help Dialogue */}
            {!isLoading && !degreePathway && <PathwayHelp />}
        </main>
    );
}
