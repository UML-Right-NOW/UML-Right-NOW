// Next
import { useContext, useState } from "react";

// Components
import { FileUploader } from "react-drag-drop-files";
import { AiFillFileAdd } from "react-icons/ai";

// Contexts
import { TranscriptContext, TranscriptContextType } from "@/contexts/TranscriptContext";

// Libraries
import Transcript from "@/Transcript";

// Constants
const FILE_TYPES = ["PDF"];
const MAX_SIZE_MB = 3;

export default function TranscriptInput() {
    // State
    const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);

    // Contexts
    const { setTranscript } = useContext(TranscriptContext) as TranscriptContextType;

    // Event handlers
    function onFileInputChanged(file: File) {
        // Store the file
        setTranscriptFile(file);

        // Remove any error messages
        setErrorText(null);

        // Ensure that the file exists
        if (!file) {
            return;
        }

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
    function onSizeError() {
        setErrorText(`Uploaded file must be smaller than ${MAX_SIZE_MB} mb!`);
    }

    // Helpers
    function removeFile() {
        setTranscriptFile(null);
        setTranscript(null);
    }

    return (
        <div className="
            flex
            flex-col
            justify-start
            items-center
        ">
            <FileUploader classes="
                text-white
                text-center
                text-sm
                bg-[rgba(0,0,0,0.5)]
                flex
                justify-center
                items-center
                border-rowdy-blue
                border-2
                border-dashed
                rounded-lg
                hover:cursor-pointer
                py-2
                mx-5
                w-full
            "
                types={FILE_TYPES}
                handleChange={onFileInputChanged}
                onSizeError={onSizeError}
                multiple={false}
                fileOrFiles={transcriptFile}
                maxSize={MAX_SIZE_MB}
            >
                {/* Icon */}
                <AiFillFileAdd className="
                    text-rowdy-blue
                    text-3xl
                "/>

                {/* Text Container */}
                <div className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    ml-5
                ">
                    {/* Text */}
                    <p className="
                        flex
                        justify-center
                        items-center
                    ">
                        Upload a UML Transcript
                    </p>

                    {/* File Types Container */}
                    <div className="
                        flex
                        justify-center
                        items-center
                        gap-2
                        mt-1
                    ">
                        {/* File Types */}
                        {FILE_TYPES.map(file_type => {
                            return (
                                <p className="
                                    bg-rowdy-blue
                                    rounded-md
                                    text-white
                                    px-2
                                " key={file_type}>
                                    {file_type}
                                </p>
                            );
                        })}
                    </div>

                    {/* Uploaded File */}
                    {transcriptFile && (
                        <p className="
                            italic
                            mt-2
                        ">
                            {transcriptFile.name}
                        </p>
                    )}
                </div>
            </FileUploader>

            {/* Error Text */}
            {errorText && (
                <p className="
                    text-rowdy-red
                    italic
                    mt-2
                    bg-[rgba(0,0,0,0.7)]
                    px-2
                    py-1
                ">
                    {errorText}
                </p>
            )}

            {/* Remove File Button */}
            {transcriptFile && <button className="
                bg-rowdy-red
                text-white
                text-sm
                hover:cursor-pointer
                px-5
                py-2
                rounded-lg
                mt-2
                hover:bg-white
                hover:text-rowdy-red
                duration-[0.2s]
            " onClick={removeFile}>
                Remove File
            </button>}
        </div>
    );
}
