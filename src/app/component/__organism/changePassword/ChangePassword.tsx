"use client";
import { PasswordInput, SubmitButton } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/app/store/settings.store";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

export type changePasswordPropsType = {
  settingsParam: string;
};

const passwordField = z
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

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const ChangePassword = ({ settingsParam }: changePasswordPropsType) => {
  const path = usePathname();
  const { changePassword } = useSettingsStore();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

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
      passwordConfirm: "",
    },
  });

  const onSubmit = async (formData: ChangePasswordFormData) => {
    if (Object.keys(errors).length > 0) return;
    const result = await changePassword(formData);
    if (result === true) {
      reset();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1
        className={` ${
          isDark
            ? "border-[#52586699] text-white"
            : " border-[#E0E4EA] text-[#0E121B]"
        } font-bold text-base`}
      >
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
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
          fieldName="passwordConfirm"
        />

        <div className="w-full flex justify-end">
          {/* <button className="">Save Password</button> */}
          <SubmitButton
            settingsParam={settingsParam}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
