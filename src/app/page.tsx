import { auth } from "../../server/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user.id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full">
        <p>Not authenticated! Please Login to continue.</p>
        <Link href="/login" className="py-2 px-5 text-white rounded-xl bg-blue-500 hover:bg-blue-700 transition-all duration-300">Login</Link>
      </div>
    )
  }

  if (session.user.id && !session.user.emailVerified) {
    return (

      <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full">
        <p>Please verify the email to continue.</p>
        <Link href={`/sign-up/verify-email?email=${encodeURIComponent(session.user.email)}`} className="py-2 px-5 text-white rounded-xl bg-blue-500 hover:bg-blue-700 transition-all duration-300">verify email</Link>
      </div>
    )
  }

  redirect("/dashboard")

}
