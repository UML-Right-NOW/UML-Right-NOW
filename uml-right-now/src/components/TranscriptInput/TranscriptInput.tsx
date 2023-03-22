// Next
import React, { ChangeEvent } from "react";
import { useRouter } from "next/router";

export default function TranscriptInput() {
    // State
    const router = useRouter();

    // Event handlers
    function onFileInputChanged (event: ChangeEvent<HTMLInputElement>) {
        // Retrieve the input element
        const inputElement = event.target as HTMLInputElement;
        if (inputElement === null || inputElement.files === null || inputElement.files.length === 0) {
            return;
        }

        // Retrieve the file
        const file = inputElement.files[0];

        // Initialize the file reader
        const fileReader = new FileReader();

        // Read the input file
        fileReader.readAsArrayBuffer(file);

        // Define the reader's onload event handler 
        fileReader.onload = function() {
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
                console.log(res);
                router.push("/pathways");
            }).catch(err => {
                console.log(err);
            });
        };
    }

    return (
        <input type="file" accept=".pdf" onChange={onFileInputChanged} />
    );
}
