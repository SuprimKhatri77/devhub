CREATE TABLE "profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"bio" text,
	"github_url" text,
	"image_url" text DEFAULT 'https://d3zng8i6n7.ufs.sh/f/JwSkmgRf87eYVyVpoGc72QWYFpRi06AjPv1X5MwHlLZhzKoG',
	"tech_stack" text[],
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;