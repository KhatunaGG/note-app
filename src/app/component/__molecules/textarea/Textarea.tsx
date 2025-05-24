import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type TextareaPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

const Textarea = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: TextareaPropsType<T>) => {
  const error = errors[fieldName]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 h-full ">
      {/* <textarea
        {...register(fieldName)}
        className="w-full h-full  resize-none outline-none text-sm text-[#232530] p-2"
        placeholder="Write your note here..."
      /> */}
      <textarea
        {...register(fieldName)}
        // className="w-full min-h-[calc(100vh/2)] resize-none overflow-auto outline-none text-sm text-[#232530] p-2"
        className="w-full min-h-[calc(100vh/2)] resize-none overflow-auto outline-none text-sm text-primary-light dark:text-primary-dark p-2"
        placeholder="Write your note here..."
      />
      {errors.content?.message && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Textarea;