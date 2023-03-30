// Next
import React, { ChangeEvent, useContext } from "react";
import { useRouter } from "next/router";

// Components
import { FileUploader } from "react-drag-drop-files";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

// Libraries
import Transcript from "@/Transcript";

export default function TranscriptInput() {
    // State
    const router = useRouter();

    // Contexts
    const { setTranscript } = useContext(TranscriptContext) as TranscriptContextType;

    // Event handlers
    function onFileInputChanged (file: File) {
        // Initialize the file reader
        const fileReader = new FileReader();

        // Read the input file
        fileReader.readAsArrayBuffer(file);

        // Define the reader's onload event handler 
        fileReader.onload = function () {
            // Convert the file's array buffer into a typed array
            const typedArray = new Uint8Array(this.result as ArrayBuffer);

            // Initialize a form data object to send to the backend
            const formData = new FormData();

            // Append the file's data to the form data object
            formData.append("binary_data", new Blob([typedArray]));

            // Send the data to the backend
            fetch("/api/transcript", {
                method: "POST",
                body: formData
            }).then(res => {
                res.json().then(data => {
                    // Cache the parsed transcript data
                    setTranscript(new Transcript(data["courses"]));
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        };
    }

    return (
        <FileUploader classes="
            mt-10
            bg-[rgba(0,0,0,0.5)]
            !border-rowdy-blue
            [&>*]:[&>*]:!text-white
            [&>*]:[&>*]:!fill-rowdy-blue
        " 
        types={["PDF"]}
        label="Upload or drop a UML transcript"
        handleChange={onFileInputChanged} 
        />
    );
}
