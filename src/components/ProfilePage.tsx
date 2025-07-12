"use client"

import Image from "next/image";
import { userProfileType } from "../../lib/db/schema";
import { Button } from "./ui/button";
import { useState } from "react";


interface CurrentUser {
    name: string;
}

export default function ProfilePage({ userProfileData, currentUserData }: { userProfileData: userProfileType[], currentUserData: CurrentUser }) {
    const [showUpdateImage, setShowUpdateImage] = useState(false)
    return (
        <div className="">
            {userProfileData.map((user) => (
                <div key={user.userId} className="flex flex-col items-center justify-center py-5">
                    <div onClick={() => setShowUpdateImage(prev => !prev)}>
                        <Image src={user.imageUrl || "https://d3zng8i6n7.ufs.sh/f/JwSkmgRf87eYVyVpoGc72QWYFpRi06AjPv1X5MwHlLZhzKoG"} alt="profile-picture" width={200} height={200} className="rounded-full cursor-pointer" />
                        <button className={`shadow-xl bg-gray-100 py-3 px-5 rounded-lg absolute left-[55%] top-[30%] ${showUpdateImage ? "" : "hidden"} cursor-pointer hover:bg-gray-200 transition-all duration-300`}>Change profile picture</button>
                    </div>
                    <p>{currentUserData.name}</p>
                    <Button>Edit profile</Button>
                </div>
            ))}
        </div>
    )
}