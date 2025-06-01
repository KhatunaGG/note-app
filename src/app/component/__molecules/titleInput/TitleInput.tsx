import { TitleInputPropsType } from "@/app/interface";
import { FieldValues } from "react-hook-form";

const TitleInput = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: TitleInputPropsType<T>) => {
  const error = errors[fieldName]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 relative">
      <input
        type="text"
        {...register(fieldName)}
        className="w-full outline-none font-bold text-2xl text-primary-light dark:text-primary-dark"
        placeholder="Enter a title…"
      />
      {errors.title?.message && (
        <p className="text-red-500 text-xs absolute -bottom-4 right-0">
          {error}
        </p>
      )}
    </div>
  );
};

export default TitleInput;
