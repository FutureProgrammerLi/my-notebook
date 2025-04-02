import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "@/components/ui/sidebar";

export async function Header() {
    const user = await getUser();
    return (
        <header
            className="relative flex h-24 w-full item-center justify-between bg-popover px-3 pb-2 sm:px-8"
            style={{
                boxShadow: shadow
            }}
        >
            <SidebarTrigger className="absolute left-1 top-1" />
            <Link href='/' className="flex items-end gap-2">
                <Image src='/favicon.png' height={60} width={60} alt='logo' className="rounded-full" priority />
                <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
                    LIS <span>Notes</span>
                </h1>
            </Link>

            <div className="flex gap-4 items-center">
                {user ? <LogoutButton />
                    :
                    <>
                        <Button asChild>
                            <Link href="/signup" className="hidden sm:block">Sign up</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                        </Button>
                    </>
                }
                <ModeToggle />
            </div>
        </header >
    );
}