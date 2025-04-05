import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import AskAIButton from "./components/AskAIButton";
import NewNoteButton from "./components/NewNoteButton";
import PreviewSwitch from "./components/PreviewSwitch";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Home({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0] :
    noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id
    }
  })
  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full justify-end">
        {/* <AskAIButton user={user} /> */}
        <NewNoteButton user={user} />
      </div>
      <div className="w-full h-full">
        <PreviewSwitch noteId={noteId} noteText={note?.text || ""} />
      </div>
      {/* <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} /> */}
    </div >
  );
}
