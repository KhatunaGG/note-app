import { TextareaPropsType } from "@/app/interface";
import { FieldValues } from "react-hook-form";

const Textarea = <T extends FieldValues>({
  register,
  errors,
  fieldName,
}: TextareaPropsType<T>) => {
  const error = errors[fieldName]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 h-full ">
      <textarea
        {...register(fieldName)}
        className="w-full min-h-[calc(100vh/2)] resize-none overflow-auto outline-none text-sm text-primary-light dark:text-primary-dark p-2"
        placeholder="Write your note here..."
      />
      {errors.content?.message && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
