'use client'

import { createContext, useState } from "react";
type NoteProviderProps = {
    noteText: string;
    setNoteText: (noteText: string) => void;
};

export const NoteProviderContext = createContext<NoteProviderProps>({
    noteText: "",
    setNoteText: () => { },
});

export default function NoteProvider({ children }: { children: React.ReactNode }) {
    const [noteText, setNoteText] = useState("");

    return (
        <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
            {children}
        </NoteProviderContext.Provider>
    )
}