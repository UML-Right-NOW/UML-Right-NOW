import { useState, createContext, ReactNode } from "react";

// Types
type HamburgerMenuContextProviderProps = {
    children: ReactNode
};
export type HamburgerMenuContextType = {
    hamburgerMenuIsVisible: boolean,
    setHamburgerMenuIsVisible: (value: boolean) => void
};

// Contexts
export const HamburgerMenuContext = createContext<HamburgerMenuContextType | null>(null);

export default function HamburgerMenuContextProvider({ children }: HamburgerMenuContextProviderProps) {
    // State
    const [isVisible, setIsVisible] = useState(false);

    return (
        <HamburgerMenuContext.Provider value={{ hamburgerMenuIsVisible: isVisible, setHamburgerMenuIsVisible: setIsVisible }}>
            { children }
        </HamburgerMenuContext.Provider>
    );
}
