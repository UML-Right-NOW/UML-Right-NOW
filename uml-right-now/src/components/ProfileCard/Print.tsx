import React, { createRef, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PathwayTable from "@/components/PathwayTable/PathwayTable";
import DegreePathway from "@/DegreePathway";
import { useScreenshot } from "use-react-screenshot";
import jsPDF from "jspdf";
interface PrintPathwayProps {
  degreePathway: DegreePathway;
}


      
const PrintPathway: React.FC<PrintPathwayProps> = ({ degreePathway }) => {
    const ref = createRef<HTMLDivElement>();
    const [image, takeScreenshot] = useScreenshot({ type: "png", quality: 1 });
      
    const handleDownloadPDF = async () => {
        await takeScreenshot(ref.current);
        const pdf = new jsPDF();
        pdf.addImage(
            image,
            "PNG",
            0,
            0,
            pdf.internal.pageSize.width,
            pdf.internal.pageSize.height
        );
        pdf.save("screenshot.pdf");
    };
    return (
        <div className="flex flex-wrap justify-center">
            <button  className="
            float-right
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
            duration-[0.2s]" onClick={handleDownloadPDF}> {"Print Your Pathway"}
            </button>
            
            <div
                ref={ref}
                className="
                  W  -full !important flex justify-center 
                  
          "
            >

                <PathwayTable degreePathway={degreePathway} />
            </div>
            
        </div>
    );
};

export default PrintPathway;
