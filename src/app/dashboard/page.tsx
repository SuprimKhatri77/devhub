import { headers } from "next/headers"
import { auth } from "../../../server/lib/auth"
import { redirect } from "next/navigation"
import DashboardPage from "@/components/DashboardPage"

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session?.user.id) {
        redirect("/login")
    }
    return <DashboardPage />
}