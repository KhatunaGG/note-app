import React from "react";
import { Tag } from "../../__atoms";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type TagInputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

const TagInput = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: TagInputPropsType<T>) => {
  const error = errors[fieldName]?.message as string | undefined;

  return (
    <div className="w-full flex flex-col gap-1 ">
      <div className="flex items-center">
        <div className="w-[28%] md:w-[19.55%] flex gap-[6px] items-center ">
          <Tag width={"16px"} height={"16px"} />
          {/* <p className="text-xs md:text-sm text-[#2B303B]">Tags</p> */}
          <p className="text-xs md:text-sm text-primary-light dark:text-primary-dark">
            Tags
          </p>
        </div>
        <div
          className={`w-[72%] md:w-[80.45%] flex gap-[6px] items-center relative`}
        >
          <input
            {...register(fieldName)}
            type="text"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="text-xs md:text-sm text-[#99A0AE] w-full outline-none flex flex-wrap"
          />
          {errors.tags?.message && (
            <p className="text-red-500 text-xs absolute -bottom-4 right-0">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagInput;
