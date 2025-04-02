'use client'

import { SidebarMenuButton } from "@/components/ui/sidebar";
import useNote from "@/hooks/use-note";
import { Note } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    note: Note;
}
export default function SelectNoteButton({ note }: Props) {
    const noteId = useSearchParams().get('noteId') || "";
    const [localNoteText, setLocalNoteText] = useState(note.text)
    const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = useState(false);
    const { noteText: selectedNoteText } = useNote();
    const blankNoteText = 'EMPTY NOTE';
    let noteText = localNoteText || blankNoteText;

    useEffect(() => {
        if (noteId === note.id) {
            setShouldUseGlobalNoteText(true);
        } else {
            setShouldUseGlobalNoteText(false);
        }
    }, [noteId, note.id]);

    useEffect(() => {
        if (shouldUseGlobalNoteText) {
            setLocalNoteText(selectedNoteText);
        }
    }, [selectedNoteText, shouldUseGlobalNoteText])

    if (shouldUseGlobalNoteText) {
        noteText = selectedNoteText || blankNoteText;
    }
    return (
        <SidebarMenuButton
            asChild
            className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}
        >
            <Link
                href={`?noteId=${note.id}`}
                className="flex h-fit flex-col"
            >
                <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
                    {noteText}
                </p>
                <p
                    className='text-muted-foreground text-xs'>
                    {note.updatedAt.toLocaleDateString()
                    }</p>
            </Link>
        </SidebarMenuButton>
    )
}
