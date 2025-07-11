"use client"

import { Label } from "@/components/ui/label"
import { authClient } from "../../../../../../server/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage({ token }: { token: string }) {
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()

    const handleClick = async () => {

        setIsClicked(true)

        if (newPassword === confirmNewPassword) {


            const { data, error } = await authClient.resetPassword({
                newPassword,
                token
            })

            if (error) {
                toast.error("Failed to reset password");
                console.error(error)
                return
            }
            toast.success("Password reset successfully. Redirecting...")
            setNewPassword("")
            setConfirmNewPassword("")
            setTimeout(() => {
                router.push("/login")
            }, 1500);

        } else {
            toast("Password didn't match!")
        }
        setIsClicked(false)
    }
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div>

                        <h1 className="mb-1 mt-4 text-xl font-semibold">Reset Password</h1>
                        <p className="text-sm">Update your password and continue!</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="newPassword"
                                className="block text-sm">
                                New Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="newPassword"
                                id="newPassword"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="confirmNewPassword"
                                className="block text-sm">
                                New Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>

                        <Button className="w-full" onClick={handleClick} disabled={isClicked}>Reset Password</Button>
                    </div>


                </div>


            </div>
        </section>
    )

}