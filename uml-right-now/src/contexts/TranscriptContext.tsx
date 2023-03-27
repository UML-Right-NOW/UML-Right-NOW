// Next
import { useState, createContext, ReactNode } from "react";

// Libraries 
import Transcript from "@/Transcript";

// Types
type TranscriptContextProviderProps = {
    children: ReactNode
};
export type TranscriptContextType = {
    transcript: Transcript | null,
    setTranscript: (value: Transcript| null) => void
};

// Contexts
export const TranscriptContext = createContext<TranscriptContextType | null>(null);

export default function TranscriptContextProvider({ children }: TranscriptContextProviderProps) {
    // State
    const [transcript, setTranscript] = useState(null);

    return (
        <TranscriptContext.Provider value={{ transcript: transcript, setTranscript: setTranscript as (value: Transcript | null) => void}}>
            { children }
        </TranscriptContext.Provider>
    );
}
