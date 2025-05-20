import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

export type TitleInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

const TitleInput = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: TitleInputPropsType<T>) => {
  const error = errors[fieldName]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        {...register(fieldName)}
        // className="w-full outline-none font-bold text-2xl text-[#0E121B]"
        className="w-full outline-none font-bold text-2xl text-primary-light dark:text-primary-dark"
        placeholder="Enter a title…"
      />
      {errors.title?.message && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TitleInput;