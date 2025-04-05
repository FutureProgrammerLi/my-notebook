'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoteTextInput from "./NoteTextInput"
import MarkdownPreview from "./MarkdownPreview"
import { useSearchParams } from "next/navigation"
import { useEffect,ChangeEvent } from "react"
import useNote from "@/hooks/use-note";
import { debounceTimeout } from "@/lib/consts";
import { updateNoteAction } from "../actions/notes";

let updateTimeout: NodeJS.Timeout;
export default function PreviewSwitch({ noteId, noteText: startingNoteText }: { noteId: string, noteText: string}) {
    const noteIdParam = useSearchParams().get('noteId') || "";
    const { noteText, setNoteText } = useNote();

    useEffect(() => {
        if (noteIdParam === noteId) {
            setNoteText(startingNoteText)
        }
    }, [startingNoteText, noteIdParam, noteId, setNoteText])
    function handleUpdateNote(e: ChangeEvent<HTMLTextAreaElement>) {
        const text = e.target.value;
        setNoteText(text)
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            updateNoteAction(noteId, text);
        }, debounceTimeout);
    }
    return (
        <Tabs defaultValue="Edit" className="h-full">
            <TabsList>
                <TabsTrigger value="Edit">Edit</TabsTrigger>
                <TabsTrigger value="Preivew">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="Edit" className="h-full">
                <NoteTextInput noteText={noteText} handleUpdateNote={handleUpdateNote} />
            </TabsContent>
            <TabsContent value="Preivew" className="h-full">
                <MarkdownPreview noteText={noteText}/>
            </TabsContent>
        </Tabs>
    )
}
