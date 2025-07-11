"use server";

import z from "zod";
import { auth } from "../lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string[];
};

export async function SignIn(prevState: FormState, formData: FormData) {
  const userData = z.object({
    email: z.string().email("Please enter a valid email!"),
    password: z.string().min(8, "Password must be greater than 8 character"),
  });

  const validateFields = userData.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateFields.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { message: ["User already exists."] };
        case "BAD_REQUEST":
          return { message: ["Invalid email."] };
        default:
          return { message: [`${error.body?.message}`] };
      }
    }
    throw error;
  }
  redirect("/dashboard");
}
