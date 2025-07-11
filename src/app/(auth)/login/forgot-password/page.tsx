"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { FormState, SearchEmail } from '../../../../../server/actions/forgot-password'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { authClient } from '../../../../../server/lib/auth-client'

export default function ForgotPasswordPage() {
    const initialState: FormState = {
        errors: {}
    } as FormState

    const [state, formAction, isPending] = useActionState<FormState, FormData>(SearchEmail, initialState)
    const [email, setEmail] = useState("")
    useEffect(() => {
        async function sendResetPasswordLink() {

            if (state.success && state.message) {
                toast(state.message)
                await authClient.requestPasswordReset({
                    email,
                    redirectTo: "/login/forgot-password/reset-password"
                })
            }
        }
        sendResetPasswordLink()

    }, [state.success, state.message])

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                action={formAction}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home"
                        >
                            <svg role="img" className='w-8 h-8 object-cover object-center' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>DevHub</title><path d="M22.635 3.883a1.364 1.25 0 0 0-1.363 1.25 1.364 1.25 0 0 0 1.363 1.25A1.364 1.25 0 0 0 24 5.133a1.364 1.25 0 0 0-1.365-1.25zm-16.004.418-6.027.008c-.026 0-.051-.003-.076 0-.296.036-.527.273-.528.558l.018 14.574c0 .22.06.676.682.676l5.58-.021c1.595-.003 2.664-.031 3.3-.112h.016a11.43 11.43 0 0 0 1.955-.469c1.22-.38 2.3-.944 3.23-1.697a7.854 7.854 0 0 0 2.114-2.562 6.716 6.716 0 0 0 .646-1.987 4.244 3.89 0 0 0 .26.028 4.244 3.89 0 0 0 4.244-3.89 4.244 3.89 0 0 0-4.244-3.89 4.244 3.89 0 0 0-2.9 1.082 8.838 8.838 0 0 0-2.25-1.355c-1.536-.65-3.536-.948-6.02-.943zm-.262 3.004c1.215-.003 2.079.034 2.569.101a7.32 7.32 0 0 1 1.617.436c.57.218 1.068.483 1.496.814 1.177.915 1.732 1.999 1.734 3.432.003 1.468-.534 2.611-1.68 3.57a5.582 5.582 0 0 1-1.177.742c-.409.19-.942.355-1.615.496-.636.128-1.6.2-2.856.202l-2.673.004-.012-9.793 2.598-.004z" /></svg>
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
                        <p className="text-sm">Enter your email to receive a reset link</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button className="w-full" disabled={isPending}>Send Reset Link</Button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground text-sm">We'll send you a link to reset your password.</p>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Remembered your password?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/login">Log in</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}