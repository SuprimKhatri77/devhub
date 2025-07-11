"use client"


import { useSearchParams } from "next/navigation"
import ResetPasswordPage from "./ResetPasswordPage"

export default function ResetPassword() {
    const params = useSearchParams()
    const token = params.get("token") as string

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Not Authorized!</h1>
            </div>
        )
    }




    return <ResetPasswordPage token={token} />
}