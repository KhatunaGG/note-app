// "use client";

// export type SubmitButtonPropsType = {
//   isSubmitting: boolean;
//   createNote: boolean;
// };

// function SubmitButton({ isSubmitting, createNote }: SubmitButtonPropsType) {
//   return (
//     <button
//       type="submit"
//       disabled={!createNote || isSubmitting}
//       className={`bg-[#335CFF] text-sm text-white py-3 px-4 rounded-lg transition-opacity ${
//         !createNote || isSubmitting
//           ? "opacity-50 cursor-not-allowed"
//           : "hover:opacity-90"
//       }`}
//     >
//       {isSubmitting ? "Saving..." : "Save Note"}
//     </button>
//   );
// }

// export default SubmitButton;




"use client";

export type SubmitButtonPropsType = {
  isSubmitting: boolean;
  createNote: boolean;
};

function SubmitButton({ isSubmitting, createNote }: SubmitButtonPropsType) {
  return (
    <button
      type="submit"
      disabled={!createNote || isSubmitting}
      className={`text-[#335CFF] lg:bg-[#335CFF] text-sm lg:text-white lg:py-3 lg:px-4 lg:rounded-lg lg:transition-opacity ${
        !createNote || isSubmitting
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      }`}
    >
      {isSubmitting ? "Saving..." : "Save Note"}
    </button>
  );
}

export default SubmitButton;
