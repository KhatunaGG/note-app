"use client";
export type SubmitButtonPropsType = {
  isSubmitting: boolean;
  createNote?: boolean;
  settingsParam?: string;
};

function SubmitButton({
  isSubmitting,
  createNote,
  settingsParam,
}: SubmitButtonPropsType) {
  const isDisabled = settingsParam ? isSubmitting : !createNote || isSubmitting;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`text-[#335CFF] lg:bg-[#335CFF] text-sm lg:text-white lg:py-3 lg:px-4 lg:rounded-lg lg:transition-opacity ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
      }`}
    >
      {isSubmitting
        ? "Saving..."
        : settingsParam
        ? "Save Password"
        : "Save Note"}
    </button>
  );
}

export default SubmitButton;
