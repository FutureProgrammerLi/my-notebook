'use client'

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner'
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { loginAction, signUpAction } from "../actions/users";
type Props = {
    type: "login" | "signup"
}
export default function AuthForm({ type }: Props) {
    const router = useRouter();
    const isLoginForm = type === "login";
    const [isPending, startTransition] = useTransition();
    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            let errorMessage, title, description;
            if (isLoginForm) {
                errorMessage = (await loginAction(email, password)).errorMessage;
                title = "Logged in";
                description = "You have been successfully logged in!";
            } else {
                errorMessage = (await signUpAction(email, password)).errorMessage;
                title = "Signed up";
                description = "You have been successfully signed up!";
            }
            if (!errorMessage) {
                toast.success(title, {
                    description
                });
                router.push('/')
            } else {
                toast.error("Error", {
                    description: errorMessage,
                });
            }
        })
    }

    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        disabled={isPending} />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        disabled={isPending} />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full">
                    {
                        isPending ?
                            <Loader2 className="animate-spin" /> :
                            isLoginForm ?
                                "Login" : "Sign up"
                    }
                </Button>
                <p className="text-xs">
                    {isLoginForm ? 'Don\'t have an account? ' : 'Already have an account? '}{" "}
                    <Link href={isLoginForm ? "/signup" : "/login"} className={`text-blue-500 underline ${isPending ? 'pointer-events-none opacity-50' : ""}`}>
                        {isLoginForm ? "Sign up" : "Login"}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}
