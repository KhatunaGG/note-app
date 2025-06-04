import { z } from "zod";

export const passwordField = z
  .string()
  .min(4, "Password must be at least 4 characters")
  .nonempty("Password is required");
export const ChangePasswordSchema = z
  .object({
    oldPassword: passwordField,
    passwordNew: passwordField,
    passwordConfirm: passwordField,
  })
  .superRefine((data, ctx) => {
    if (data.passwordNew !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Passwords don't match",
      });
    }
  });

export const forgotPasswordSchema = z.object({
  resendEmail: z
    .string()
    .min(1, "Email is requeued")
    .nonempty("Email is required"),
});

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is requeued")
    .nonempty("Email password is required"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
});

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string().min(1, "Content cannot be empty"),
  isArchived: z.boolean(),
  tags: z.string().min(1, "Tags cannot be empty"),
  lastEdited: z.string().optional(),
});

export const newPasswordSchema = z
  .string()
  .min(4, "Password must be at least 4 characters")
  .max(11, "Password must be no more than 11 characters");

export const confirmPasswordSchema = z
  .object({
    newPassword: newPasswordSchema,
    confirmPassword: z
      .string()
      .min(4, "Confirm password must be at least 4 characters")
      .nonempty("Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const signInSchema = z.object({
  signInEmail: z
    .string()
    .min(1, "Email is requeued")
    .nonempty("Email password is required"),
  signInPassword: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
});
