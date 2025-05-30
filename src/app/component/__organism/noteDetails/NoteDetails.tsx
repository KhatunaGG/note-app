// "use client";
// import Footer from "../footer/Footer";
// import { Clock } from "../../__atoms";
// import { AnimateSpin, TagInput, Textarea, TitleInput } from "../../__molecules";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import useManageNotes from "@/app/store/notes.store";
// import { useEffect } from "react";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { useUtilities } from "@/app/store/utilities.store";
// import GoBack from "../goBack/GoBack";
// import { usePathname } from "next/navigation";
// import { useMountedTheme } from "@/app/hooks/useMountedTheme";

// const createNoteSchema = z.object({
//   title: z.string().min(1, "Title cannot be empty"),
//   content: z.string().min(1, "Content cannot be empty"),
//   isArchived: z.boolean(),
//   tags: z.string().min(1, "Tags cannot be empty"),
//   lastEdited: z.string().optional(),
// });

// export type NoteType = z.infer<typeof createNoteSchema>;

// const NoteDetails = ({ noteParam }: { noteParam?: string }) => {
//   const { accessToken } = useSignInStore();
//   const {
//     formatDate,
//     selectedTags,
//     setIsTagsPage,
//     setIsNotePage,
//     isNotePage,
//     setIsArchivedPage,
//     isArchivedPage,
//     isNoteDetailsPage,
//     setIsNoteDetailsPage,
//   } = useUtilities();
//   const path = usePathname();
//   const {
//     createNote,
//     createNewNote,
//     getAllNotes,
//     getNoteById,
//     noteById,
//     isLoading,
//   } = useManageNotes();
//   // const { theme, systemTheme } = useTheme();
//   // const [mounted, setMounted] = useState(false);

//   // useEffect(() => {
//   //   setMounted(true);
//   // }, []);
//   const { mounted, theme } = useMountedTheme();
//   const isDark = mounted && theme === "dark";

//   useEffect(() => {
//     setIsTagsPage(path.includes("/tags"));
//     setIsNotePage(path.includes("/note"));
//     setIsArchivedPage(path.includes("/archive"));
//     setIsNoteDetailsPage(path.includes("/noteDetails"));
//   }, [path]);

//   useEffect(() => {
//     if (noteParam) {
//       getNoteById(noteParam);
//     }
//   }, [accessToken, noteParam]);

//   const {
//     register,
//     reset,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     setValue,
//   } = useForm<NoteType>({
//     resolver: zodResolver(createNoteSchema),
//     defaultValues: {
//       title: "",
//       content: "",
//       tags: "",
//       isArchived: false,
//       lastEdited: "",
//     },
//   });

//   const onSubmit = async (formData: NoteType) => {
//     if (Object.keys(errors).length > 0) return;
//     let result;
//     if (createNote) {
//       result = await createNewNote(formData);
//     }
//     if (result) {
//       getAllNotes();
//     }
//   };

//   // useEffect(() => {
//   //   if (noteById) {
//   //     setValue("title", noteById.title || "");
//   //     setValue("content", noteById.content || "");
//   //     setValue(
//   //       "tags",
//   //       Array.isArray(noteById.tags)
//   //         ? noteById.tags.join(", ")
//   //         : noteById.tags || ""
//   //     );
//   //     setValue("isArchived", !!noteById.isArchived);
//   //     setValue("lastEdited", noteById.lastEdited || "");
//   //   } else if (createNote) {
//   //     reset({
//   //       title: "",
//   //       content: "",
//   //       tags: "",
//   //       isArchived: false,
//   //       lastEdited: "",
//   //     });
//   //   }
//   // }, [noteById, setValue, createNote, reset]);



// useEffect(() => {
//   if (!createNote && noteById) {
//     setValue("title", noteById.title || "");
//     setValue("content", noteById.content || "");
//     setValue(
//       "tags",
//       Array.isArray(noteById.tags)
//         ? noteById.tags.join(", ")
//         : noteById.tags || ""
//     );
//     setValue("isArchived", !!noteById.isArchived);
//     setValue("lastEdited", noteById.lastEdited || "");
//   }
// }, [noteById, setValue, createNote]);


// useEffect(() => {
//   if (createNote) {
//     reset({
//       title: "",
//       content: "",
//       tags: "",
//       isArchived: false,
//       lastEdited: "",
//     });
//   }
// }, [createNote, reset]);





//   const lastEditedText = noteById?.lastEdited
//     ? formatDate(noteById.lastEdited)
//     : "Not yet saved";

// if (isLoading) {
//   return (
//     <div className="w-full flex justify-center items-center min-h-screen">
//       <AnimateSpin />
//     </div>
//   );
// }
//   if (!accessToken) return null;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full relative ">
//       <div
//         className={`${
//           isDark ? "border-r-[#52586699]" : "border-r-[#E0E4EA]"
//         } w-full px-6 pt-5 pb-4 h-full lg:flex flex-col gap-4 border-r min-h-screen`}
//       >
//         <div
//           className={`${
//             (isNotePage && createNote) ||
//             createNote ||
//             (!createNote && noteById) ||
//             isNoteDetailsPage
//               ? "flex"
//               : "hidden"
//           } flex-grow w-full bg-primary-light dark:bg-primary-dark flex-col gap-4`}
//         >
//           <GoBack
//             isNoteDetailsPage={isNoteDetailsPage}
//             isNotePage={isNotePage}
//             noteById={noteById}
//             isArchivedPage={isArchivedPage}
//             isSubmitting={isSubmitting}
//             createNote={createNote}
//             selectedTags={selectedTags}
//           />
//           <div className="w-ful flex flex-col gap-4">
//             <TitleInput
//               register={register}
//               errors={errors}
//               fieldName={"title"}
//             />
//             <div className="flex flex-col gap-2">
//               <TagInput
//                 register={register}
//                 errors={errors}
//                 fieldName={"tags"}
//               />
//               <div className="w-full flex items-center ">
//                 <div className="flex gap-[6px] items-center w-[28%] md:w-[19.55%] ">
//                   <Clock />
//                   <p className=" text-xs md:text-sm text-primary-light dark:text-primary-dark whitespace-nowrap">
//                     Last edited
//                   </p>
//                 </div>
//                 <div className="w-[72%] md:w-[80.45%]  flex gap-[6px] items-center ">
//                   <p className="text-xs md:text-sm text-[#99A0AE]">
//                     {lastEditedText}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`${
//                 isDark ? "border-t-[#52586699]" : "border-t-[#E0E4EA]"
//               } border-t pt-4 flex-grow`}
//             >
//               <Textarea
//                 register={register}
//                 errors={errors}
//                 fieldName={"content"}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer isSubmitting={isSubmitting} createNote={createNote} />
//     </form>
//   );
// };

// export default NoteDetails;



"use client";
import Footer from "../footer/Footer";
import { Clock } from "../../__atoms";
import { AnimateSpin, TagInput, Textarea, TitleInput } from "../../__molecules";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useManageNotes from "@/app/store/notes.store";
import { useEffect } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useUtilities } from "@/app/store/utilities.store";
import GoBack from "../goBack/GoBack";
import { usePathname } from "next/navigation";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const createNoteSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string().min(1, "Content cannot be empty"),
  isArchived: z.boolean(),
  tags: z.string().min(1, "Tags cannot be empty"),
  lastEdited: z.string().optional(),
});

export type NoteType = z.infer<typeof createNoteSchema>;

const NoteDetails = ({ noteParam }: { noteParam?: string }) => {
  const { accessToken } = useSignInStore();
  const {
    formatDate,
    selectedTags,
    setIsTagsPage,
    setIsNotePage,
    isNotePage,
    setIsArchivedPage,
    isArchivedPage,
    isNoteDetailsPage,
    setIsNoteDetailsPage,
  } = useUtilities();
  const path = usePathname();
  const {
    createNote,
    createNewNote,
    getAllNotes,
    getNoteById,
    noteById,
    isLoading,
  } = useManageNotes();
  // const { theme, systemTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
    setIsNotePage(path.includes("/note"));
    setIsArchivedPage(path.includes("/archive"));
    setIsNoteDetailsPage(path.includes("/noteDetails"));
  }, [path]);

  useEffect(() => {
    if (noteParam) {
      getNoteById(noteParam);
    }
  }, [accessToken, noteParam]);

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<NoteType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      isArchived: false,
      lastEdited: "",
    },
  });

  const onSubmit = async (formData: NoteType) => {
    if (Object.keys(errors).length > 0) return;
    let result;
    if (createNote) {
      result = await createNewNote(formData);
    }
    if (result) {
      getAllNotes();
    }
  };

  // useEffect(() => {
  //   if (noteById) {
  //     setValue("title", noteById.title || "");
  //     setValue("content", noteById.content || "");
  //     setValue(
  //       "tags",
  //       Array.isArray(noteById.tags)
  //         ? noteById.tags.join(", ")
  //         : noteById.tags || ""
  //     );
  //     setValue("isArchived", !!noteById.isArchived);
  //     setValue("lastEdited", noteById.lastEdited || "");
  //   } else if (createNote) {
  //     reset({
  //       title: "",
  //       content: "",
  //       tags: "",
  //       isArchived: false,
  //       lastEdited: "",
  //     });
  //   }
  // }, [noteById, setValue, createNote, reset]);



useEffect(() => {
  if (!createNote && noteById) {
    setValue("title", noteById.title || "");
    setValue("content", noteById.content || "");
    setValue(
      "tags",
      Array.isArray(noteById.tags)
        ? noteById.tags.join(", ")
        : noteById.tags || ""
    );
    setValue("isArchived", !!noteById.isArchived);
    setValue("lastEdited", noteById.lastEdited || "");
  }
}, [noteById, setValue, createNote]);


useEffect(() => {
  if (createNote) {
    reset({
      title: "",
      content: "",
      tags: "",
      isArchived: false,
      lastEdited: "",
    });
  }
}, [createNote, reset]);





  const lastEditedText = noteById?.lastEdited
    ? formatDate(noteById.lastEdited)
    : "Not yet saved";

if (isLoading) {
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <AnimateSpin />
    </div>
  );
}
  if (!accessToken) return null;

  console.log(noteParam, "noteParam form NOTE DETAIL")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full relative ">
      <div
        className={`${
          isDark ? "border-r-[#52586699]" : "border-r-[#E0E4EA]"
        } w-full px-6 pt-5 pb-4 h-full lg:flex flex-col gap-4 border-r min-h-screen`}
      >
        <div
          className={`${
            (isNotePage && createNote) ||
            createNote ||
            (!createNote && noteById) ||
            isNoteDetailsPage
              ? "flex"
              : "hidden"
          } flex-grow w-full bg-primary-light dark:bg-primary-dark flex-col gap-4`}
        >
          <GoBack
            isNoteDetailsPage={isNoteDetailsPage}
            isNotePage={isNotePage}
            noteById={noteById}
            isArchivedPage={isArchivedPage}
            isSubmitting={isSubmitting}
            createNote={createNote}
            selectedTags={selectedTags}



            noteParam={noteParam}
          />
          <div className="w-ful flex flex-col gap-4">
            <TitleInput
              register={register}
              errors={errors}
              fieldName={"title"}
            />
            <div className="flex flex-col gap-2">
              <TagInput
                register={register}
                errors={errors}
                fieldName={"tags"}
              />
              <div className="w-full flex items-center ">
                <div className="flex gap-[6px] items-center w-[28%] md:w-[19.55%] ">
                  <Clock />
                  <p className=" text-xs md:text-sm text-primary-light dark:text-primary-dark whitespace-nowrap">
                    Last edited
                  </p>
                </div>
                <div className="w-[72%] md:w-[80.45%]  flex gap-[6px] items-center ">
                  <p className="text-xs md:text-sm text-[#99A0AE]">
                    {lastEditedText}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`${
                isDark ? "border-t-[#52586699]" : "border-t-[#E0E4EA]"
              } border-t pt-4 flex-grow`}
            >
              <Textarea
                register={register}
                errors={errors}
                fieldName={"content"}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer isSubmitting={isSubmitting} createNote={createNote} />
    </form>
  );
};

export default NoteDetails;



