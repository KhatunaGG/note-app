"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type EmailInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

const EmailInput = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: EmailInputPropsType<T>) => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  
  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label
        className={`${
          isDark ? "text-white" : "text-[#0E121B]"
        } text-sm font-medium `}
      >
        Email Address
      </label>
      <input
        type="text"
        className={` border border-[#CACFD8] rounded-lg p-3 outline-none text-[#717784]`}
        placeholder="email@example.com"
        {...register(fieldName)}
      />

      {errors[fieldName] && (
        <span className="text-red-500 text-xs absolute -bottom-4 right-0">
          {errors[fieldName]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default EmailInput;
