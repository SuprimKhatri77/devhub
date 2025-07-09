import { Button } from "@/components/ui/button";
import { authClient } from "./auth-client";

export default function SignInSocial({
    provider,
    children,
}: {
    provider:
    | "github"
    | "apple"
    | "google"
    | "facebook"
    | "microsoft"
    | "spotify"
    | "gitlab"
    | "twitter"
    | "dropbox"
    | "twitch"
    | "kick"
    | "vk"
    | "reddit"
    | "tiktok"
    | "linkedin"
    | "discord";
    children: React.ReactNode;
}) {
    return (
        <Button
            onClick={async () =>
                await authClient.signIn.social({
                    provider,
                    callbackURL: "/dashboard",
                })
            }
            type="button"
            variant="outline"
        >
            {children}
        </Button>
    );
}