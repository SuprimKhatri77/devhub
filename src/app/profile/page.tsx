import { headers } from "next/headers"
import { auth } from "../../../server/lib/auth"
import { redirect } from "next/navigation"
import { db } from "../../../lib/db"
import { profile, user, userProfileType } from "../../../lib/db/schema"
import { eq } from "drizzle-orm"
import ProfilePage from "@/components/ProfilePage"

export default async function Profile() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !session?.user.id) {
        redirect("/login")
    }

    const currentUserData = {
        name: session.user.name,
    }

    let userProfileData: userProfileType[] = await db.select().from(profile).where(eq(profile.userId, session.user.id))

    if (userProfileData.length === 0) {
        await db.insert(profile).values({
            userId: session.user.id
        })
    }

    userProfileData = await db.select().from(profile).where(eq(profile.userId, session.user.id))
    return <ProfilePage userProfileData={userProfileData} currentUserData={currentUserData} />
}