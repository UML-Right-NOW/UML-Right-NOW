import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import HeaderComponent from "@/components/PDFFile/header";
const Print = ({UserName, Major, Child} ) => {
    const [screenshot, setScreenshot] = useState(null);
    const componentRef = useRef();
  
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
            const screenshotUrl = window.location.href + "?screenshot=true";
            setScreenshot(screenshotUrl);
        },
        onAfterPrint: () => {
            setScreenshot(null);
        },
    });

    return (
        <div>
      
            <div ref={componentRef}>
                {<><HeaderComponent Username={UserName} Major={Major}  /> <child/></>}
            </div>
            <button className="
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
            duration-[0.2s]" onClick={handlePrint}>Print your Pathway</button>
        </div>
    );
};

export default Print;