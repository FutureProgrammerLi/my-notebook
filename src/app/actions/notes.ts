"use server"

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const updateNoteAction = async (noteId: string, text: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note!");
        await prisma.note.update({
            where: {
                id: noteId
            },
            data: {
                text
            }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error)
    }
}

export const createNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note!");
        await prisma.note.create({
            data: {
                id: noteId,
                authorId: user.id,
                text: ""
            }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error)
    }
}
export const deleteNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to delete a note!");
        await prisma.note.delete({
            where: {
                id: noteId,
                authorId: user.id
            }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error)
    }
}

export const askAIAboutNotesActions = async (newQuestions: string[], responses: string[]) => {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note!");

    const notes = await prisma.note.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            text: true, createdAt: true, updatedAt: true
        }
    });

    if (notes.length === 0) {
        return "You don't have any notes yet."
    }


    // AI part
    const formattedNotes = notes.map((note) =>
        `
                Text: ${note.text}
                Created at: ${note.createdAt}
                Last updated: ${note.updatedAt}
            `.trim(),
    ).join("\n");

    return 'some features to be finished'
}