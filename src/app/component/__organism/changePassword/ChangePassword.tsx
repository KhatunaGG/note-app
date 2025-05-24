"use client";
import { PasswordInput, SubmitButton } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "../header/Header";
import { usePathname } from "next/navigation";

export type changePasswordPropsType = {
  settingsParam: string;
};

// export const ChangePasswordSchema = z.object({
//   oldPassword: z
//     .string()
//     .min(1, "Email is requeued")
//     .nonempty("Email password is required"),
//   newPassword: z
//     .string()
//     .min(1, "Email is requeued")
//     .nonempty("Email password is required"),
// });

// export const confirmNewPasswordSchema = z
//   .object({
//     newPassword: newPasswordSchema,
//     confirmPassword: z
//       .string()
//       .min(4, "Confirm password must be at least 4 characters")
//       .nonempty("Confirm password is required"),
//   })
//   .superRefine((data, ctx) => {
//     if (data.newPassword !== data.confirmPassword) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["confirmPassword"],
//         message: "Passwords don't match",
//       });
//     }
//   });

const passwordField = z
  .string()
  .min(4, "Password must be at least 4 characters")
  .nonempty("Password is required");

export const ChangePasswordSchema = z
  .object({
    oldPassword: passwordField,
    passwordNew: passwordField,
    confirmPassword: passwordField,
  })
  .superRefine((data, ctx) => {
    if (data.passwordNew !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const ChangePassword = ({ settingsParam }: changePasswordPropsType) => {
  const path = usePathname()

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      passwordNew: "",
      confirmPassword: "",
    },
  });


 const onSubmit = async (formData: ChangePasswordFormData) => {

  console.log(formData, "formData")

 }



  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-[#0E121B] font-bold text-base">Change Password</h1>
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6">
        <PasswordInput
          register={register}
          errors={errors}
          fieldName="oldPassword"
        />
        <PasswordInput
          register={register}
          errors={errors}
          fieldName="passwordNew"
        />
        <PasswordInput
          register={register}
          errors={errors}
          fieldName="confirmPassword"
        />

        <div className="w-full flex justify-end">
          {/* <button className="">Save Password</button> */}
          <SubmitButton settingsParam={settingsParam} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
