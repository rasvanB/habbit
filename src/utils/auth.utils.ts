import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const getErrorMessages = (errors: FieldErrors) => {
  const errs: string[] = [];
  Object.values(errors).forEach((error) => {
    if (error && error.message && typeof error.message === "string")
      errs.push(error.message);
  });
  return errs;
};

export const LoginScheme = z
  .object(
    {
      email: z
        .string()
        .email({
          message: "Invalid email",
        })
        .min(6),
      password: z
        .string()
        .min(6, {
          message: "Password must be at least 6 characters",
        })
        .max(30, {
          message: "Password must be less than 30 characters",
        }),
    },
    {
      required_error: "Please fill out all fields",
    }
  )
  .required();

export const SignUpScheme = LoginScheme.extend({
  confirmPassword: z
    .string()
    .min(6, {
      message: "Confirm password must be at least 6 characters",
    })
    .max(30, {
      message: "Confirm password must be less than 30 characters",
    }),
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters",
    })
    .max(16, {
      message: "Username must be less than 16 characters",
    }),
})
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginType = z.infer<typeof LoginScheme>;
export type SignUpType = z.infer<typeof SignUpScheme>;
