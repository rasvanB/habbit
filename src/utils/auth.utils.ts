import { z } from "zod";
const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const validateSignIn = (email: string, password: string) => {
  if (!email || !password) {
    return "Please fill out all fields";
  }
  if (email.length < 6 || !regexEmail.test(email)) {
    return "Invalid email";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
};

export const validateSignUp = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string
) => {
  if (!email || !password || !confirmPassword || !username) {
    return "Please fill out all fields";
  }
  if (email.length < 6 || !regexEmail.test(email)) {
    return "Invalid email";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (password.length > 30) {
    return "Password must be less than 30 characters";
  }
  if (username.length > 16) {
    return "Username must be less than 16 characters";
  }
  if (username.length <= 3) {
    return "Username must be at least 4 characters";
  }
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
      message: "Password must be at least 6 characters",
    })
    .max(30, {
      message: "Password must be less than 30 characters",
    }),
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters",
    })
    .max(16, {
      message: "Username must be less than 16 characters",
    }),
}).superRefine((data) => {
  if (data.password !== data.confirmPassword) {
    return {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    };
  }
});
