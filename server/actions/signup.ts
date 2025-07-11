"use server";

import z from "zod";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import { APIError } from "better-auth/api";

export type FormState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function SignUp(prevState: FormState, formData: FormData) {
  // const data = Object.fromEntries(formData);

  const userData = z.object({
    firstName: z
      .string()
      .min(1, "Firstname is required")
      .max(20, "Firstname cannot exceed more than 20 characters")
      .nonempty(),
    lastName: z
      .string()
      .min(1, "Lastname is required")
      .max(20, "Lastname cannot exceed more than 20 characters")
      .nonempty(),
    email: z.string().email().nonempty(),
    password: z
      .string()
      .min(8, "Password must be more than or equal to 8 letters")
      .max(128, "Password must less than 20 letters")
      .nonempty(),
  });

  const validateFields = userData.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const { email, password, firstName, lastName } = validateFields.data;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { message: "User already exists." };
        case "BAD_REQUEST":
          return { message: "Invalid email" };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw error;
  }
  redirect(`/sign-up/verify-email?email=${encodeURIComponent(email)}`);
}
