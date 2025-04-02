"use server"
import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

// Auth session missing
// failed to login with qq email, but succeed with gmail

export const loginAction = async (email: string, password: string) => {
    try {
        const { auth } = await createClient();
        const { error } = await auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return { errorMessage: null };
    } catch (error) {
        return handleError(error)
    }
}
export const logOutAction = async () => {
    try {
        const { auth } = await createClient();
        const { error } = await auth.signOut();
        if (error) throw error;
        return { errorMessage: null };
    } catch (error) {
        return handleError(error)
    }
}

export const signUpAction = async (email: string, password: string) => {
    try {
        const { auth } = await createClient();
        const { data, error } = await auth.signUp({
            email,
            password
        });
        if (error) throw error
        const userId = data.user?.id;  // for supabase authentication
        if (!userId) throw new Error('User ID not found');

        // add user to data table
        await prisma.user.create({
            data: {
                id: userId,
                email
            }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error)
    }
}