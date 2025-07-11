"use server";

import z from "zod";
import { db } from "../../lib/db";
import { user } from "../../lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";

export type FormState = {
  errors?: {
    email?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function SearchEmail(prevState: FormState, formData: FormData) {
  const userEmail = z.object({
    email: z.string().email(),
  });

  const validateFields = userEmail.safeParse({
    email: formData.get("email") as string,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validateFields.data;

  try {
    const data = await db.select().from(user).where(eq(user.email, email));
    if (data.length === 0) {
      return {
        errors: {
          email: ["Email not found"],
          success: false,
          message: "Email not found",
        },
      };
    }

    return {
      success: true,
      message: "A reset password link has been sent to your email!",
    };
  } catch (error) {
    console.error("Error: ", error);
    return {};
  }

  return {};
}
