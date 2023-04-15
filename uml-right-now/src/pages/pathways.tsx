import PathwayHelp from "@/components/PathwayHelp/PathwayHelp";
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import PrintPathway from "@/components/PdfFile/Print";
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";
import { useContext, useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import PrimaryButton from "@/components/Inputs/Buttons/PrimaryButton";
//libraries
import DegreePathway from "@/DegreePathway";
import PathwayGenerator from "@/PathwayGenerator";
// Constants
const ROWDY_BLUE_COLOR = "#0369B1";

export default function Pathways() {
    // Contexts
    const { transcript, major } = useContext(TranscriptContext) as TranscriptContextType;
    const [degreePathway, setDegreePathway] = useState<DegreePathway | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [Web_View, PrintVersion] = useState(true);
    // allow to change from the pintable vertion to the default
    const toggleVersions = () => {
        PrintVersion(!Web_View);
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
                <>  {/* button hiden on small screens as print is not center */}
                    <PrimaryButton  classes="hidden md:block" onClick={toggleVersions}>{!Web_View ? "Show Web-View" : "Show Printable"}</PrimaryButton>
                    {Web_View ? 
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
