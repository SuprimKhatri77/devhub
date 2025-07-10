"use client"


import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { authClient } from "../../../../../server/lib/auth-client";

export default function VerifyEmail() {
    const params = useSearchParams()
    const email = params.get("email") as string;

    const handleClick = async () => {
        await authClient.sendVerificationEmail({
            email,
            callbackURL: "/dashboard"

        })
    }

    return (
        <div className="flex flex-col gap-3 min-h-screen items-center justify-center">
            <h1 className="text-xl font-semibold text-left">Verify your Email</h1>
            <p className="text-lg font-medium">We've sent you a verification email. Please check your email and click on the link to verify your email!</p>

            <p className="font-medium">Didn't get a verification link email?</p>
            <p className="font-medium">Click on the button below to resend verification link</p>
            <Button onClick={handleClick} variant="outline">Resend verification link</Button>
        </div>
    )
}