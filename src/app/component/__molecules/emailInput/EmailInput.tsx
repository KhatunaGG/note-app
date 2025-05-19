"use client";
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
  return (
    <div className="w-full flex flex-col gap-[6px]">
      <label className="text-sm font-medium text-[#0E121B]">Email Address</label>
      <input
        type="text"
        className="border border-[#CACFD8] rounded-lg p-3 outline-none text-[#717784]"
        placeholder="email@example.com"
        {...register(fieldName)}
      />

      {errors[fieldName] && (
        <span className="text-red-500 text-sm">
          {errors[fieldName]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default EmailInput;