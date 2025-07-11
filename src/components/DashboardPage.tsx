import SignOutButton from "./Sign-out-button";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-3 min-h-screen items-center justify-center">
            <h1>Looks like you are authenticated, mate!</h1>
            <div className="flex flex-col gap-2">
                <p>Get the hell outta here!</p>
                <SignOutButton />
            </div>
        </div>
    )
}