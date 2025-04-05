'use client'

import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

type Props = {
    noteText: string;
    handleUpdateNote: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
function NoteTextInput({ noteText, handleUpdateNote }: Props) {
    return (
        <Textarea
            value={noteText}
            onChange={handleUpdateNote}
            placeholder="Type your notes here"
            className="w-full placeholder:text-muted-foreground mb-4 h-full  resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
    )
}

export default NoteTextInput