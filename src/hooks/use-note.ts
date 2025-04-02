'use client'

import { NoteProviderContext } from "@/app/Providers/note-provider"
import { useContext } from "react"

export default function useNote() {
    const context = useContext(NoteProviderContext)
    if (!context) throw new Error('useNote must be used within a NoteProvider')

    return context;
}