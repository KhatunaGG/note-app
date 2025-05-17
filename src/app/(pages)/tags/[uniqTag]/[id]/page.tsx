import { Header, Nav, NoteDetails } from "@/app/component/__organism";


export default function page() {
  return (
    // <div>
    //   <NoteDetails />
    // </div>
        <section className="w-full flex flex-col items-start relative min-h-screen">
      <Header />
      <div className="w-full min-h-[calc(100vh-110px)] lg:hidden ">
       <NoteDetails />
      </div>
      <Nav />
    </section>
  );
}
