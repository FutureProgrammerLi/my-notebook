'use client'
import { Note } from "@prisma/client";
import { SidebarGroupContent as SidebarGroupContentShadCN, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from 'fuse.js';
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
type Props = {
    notes: Note[];
}

function SidebarGroupContent({ notes }: Props) {
    const [searchText, setSearchText] = useState('')
    const [localNotes, setLocalNotes] = useState(notes)

    useEffect(() => {
        setLocalNotes(notes)
    }, [notes]);


    // only recreate this function when localNotes change.
    const fuse = useMemo(() => {
        const options = {
            keys: ['text'],
            threshold: 0.4,
        };
        return new Fuse(localNotes, options);
    }, [localNotes]);

    const filteredNotes = searchText ?
        fuse.search(searchText).map(result => result.item) :
        localNotes;


    function deleteNoteLocally(noteId: string) {
        setLocalNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    }
    return (
        <SidebarGroupContentShadCN>
            <div className="relative flex items-center">
                <SearchIcon className="absolute left-2 size-4" />
                <Input
                    className="bg-muted pl-8"
                    placeholder="Search Your notes..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <SidebarMenu className="mt-4">
                {filteredNotes.map((note) => (
                    <SidebarMenuItem key={note.id} className="group/item">
                        <SelectNoteButton note={note} />
                        <DeleteNoteButton
                            noteId={note.id}
                            deleteNoteLocally={deleteNoteLocally}
                        />
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroupContentShadCN>
    )
}

export default SidebarGroupContent