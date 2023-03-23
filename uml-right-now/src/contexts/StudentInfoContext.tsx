// Next
import { useState, createContext, ReactNode } from "react";

// Libraries 
import Semester from "@/Semester";

// Types
type SemestersObject = {
    semesters: Semester[]
};
type StudentInfoContextProviderProps = {
    children: ReactNode
};
export type StudentInfoContextType = {
    studentInfo: SemestersObject,
    setStudentInfo: (value: SemestersObject) => void
};

// Contexts
export const StudentInfoContext = createContext<StudentInfoContextType | null>(null);

export default function StudentInfoContextProvider({ children }: StudentInfoContextProviderProps) {
    // State
    const [studentInfo, setStudentInfo] = useState({ semesters: [] } as SemestersObject);

    return (
        <StudentInfoContext.Provider value={{ studentInfo: studentInfo, setStudentInfo: setStudentInfo}}>
            { children }
        </StudentInfoContext.Provider>
    );
}
