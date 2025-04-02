'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteNoteAction } from "../actions/notes";


type Props = {
    noteId: string;
    deleteNoteLocally: (noteId: string) => void;
}
export default function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {
    const router = useRouter();
    const noteIdParams = useSearchParams().get('noteId') || ""
    const [isPending, startTransition] = useTransition();
    function handleDeleteNote() {
        startTransition(async () => {
            const { errorMessage } = await deleteNoteAction(noteId)
            if (!errorMessage) {
                toast.success('Note Deleted', {
                    description: 'You have succssfully deleted the note'
                })
                deleteNoteLocally(noteId)

                if (noteId === noteIdParams) {
                    router.replace('/')
                }
            } else {
                toast.error('Error', {
                    description: errorMessage
                })
            }
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
                    variant="ghost"
                >
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete the note?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteNote}
                        className="w-24 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
                    >
                        {isPending ?
                            <Loader2 className="animate-spin" /> :
                            "Delete"
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
