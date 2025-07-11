"use client"


import { useRouter } from "next/navigation";
import { authClient } from "../../server/lib/auth-client";
import { Button } from "./ui/button";

export default function SignOutButton() {
    const router = useRouter()
    const handleClick = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login")
                }
            }
        })
    }
    return (
        <Button variant="outline" onClick={handleClick}>Sign out</Button>
    )
}