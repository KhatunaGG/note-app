"use client";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { InfoCircle } from "../../__atoms";
import Link from "next/link";
import Eye from "../../__atoms/eye/Eye";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

export type PasswordInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  isSignInPage?: boolean;
};

const PasswordInput = <T extends FieldValues>({
  register,
  errors,
  fieldName,
  isSignInPage,
}: PasswordInputPropsType<T>) => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  const label =
    fieldName === "oldPassword"
      ? "Old Password"
      : fieldName === "passwordNew"
      ? "New Password"
      : fieldName === "confirmPassword"
      ? "Confirm Password"
      : fieldName === "passwordConfirm"
      ? "Confirm Password"
      : "Password";

  return (
    <div className="w-full flex flex-col gap-[6px]">
      <div className="w-full flex items-center justify-between">
        <label
          className={`${
            isDark ? "text-white" : "text-[#0E121B]"
          } text-sm font-medium  `}
        >
          {label}
        </label>
        {isSignInPage && (
          <Link href={"/forgot-password"}>
            <button
              type="button"
              className="text-xs font-normal font-[#525866] underline cursor-pointer hover:transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Forgot
            </button>
          </Link>
        )}
      </div>

      <div className="w-full relative">
        <input
          type="text"
          className={`
          text-[#717784]
          w-full border border-[#CACFD8] rounded-lg p-3 outline-none text-neutral`}
          placeholder=""
          {...register(fieldName)}
        />
        <Eye />
        {errors[fieldName] && (
          <span className="text-red-500 text-xs absolute -bottom-4 right-0">
            {errors[fieldName]?.message?.toString()}
          </span>
        )}
      </div>
      {(fieldName === "password" ||
        fieldName === "newPassword" ||
        fieldName === "passwordNew") && (
        <div className="flex items-center gap-2">
          <InfoCircle />
          <p className="text-[#525866] font-normal text-xs">
            At least 4 characters
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
