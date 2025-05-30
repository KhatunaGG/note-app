import { Header, Nav, Notes } from "@/app/component/__organism";

export default function page() {
  return (
    <section className="w-full flex flex-col items-start relative min-h-screen">
      <Header />
      <div className="w-full min-h-[calc(100vh-110px)] lg:hidden ">
        <Notes />
      </div>
      <Nav />
    </section>
  );
}


// import { Header, Nav, NoteDetails } from "@/app/component/__organism";

// export default async function paramPage({
//   params,
// }: {
//   params: Promise<{ uniqTag: string }>;
// }) {
//   const { uniqTag} = await params;

//   return (
//       <section className="w-full flex flex-col items-start relative min-h-screen">
//       <Header />
//       <div className="w-full min-h-[calc(100vh-110px)] lg:hidden ">
//           {/* {id && <NoteDetails noteParam={id} />} */}
//           {uniqTag &&  <NoteDetails noteParam={uniqTag} />}
//         {/* <NoteDetails noteParam={uniqTag} /> */}
//       </div>
//       <Nav />
//     </section>
//   );
// }
