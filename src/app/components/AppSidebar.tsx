import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"

import { getUser } from '@/auth/server';
import { Note } from "@prisma/client";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";


export async function AppSidebar() {
    const user = await getUser();

    let notes: Note[] = [];
    if (user) {
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    return (
        <Sidebar>
            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 mt-2 text-lg">
                        {user ?
                            "Your notes" :
                            <p>
                                <Link href='/login' className='underline'>
                                    Login
                                </Link>
                            </p>
                        }
                    </SidebarGroupLabel>
                    {user && <SidebarGroupContent  notes={notes}/>}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
