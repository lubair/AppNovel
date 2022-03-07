import { createContext } from "react";

export type AppearanceMode = 'light' | 'dark';

interface Props {
    mode: AppearanceMode;
    accentColor: string;
    setMode: (mode: AppearanceMode) => void;
    setAccentColor: (accentColor: string) => void;
}

export const DarkModeContext = createContext<Props>({
    accentColor: '#AC0AF8',
    mode: 'light',
    setAccentColor: (accentColor: string) => { },
    setMode: (mode: AppearanceMode) => { },
});