import { Header, Nav, NoteDetails } from "@/app/component/__organism";

export default function page() {
  return (
    <section className="w-full flex flex-col items-start relative min-h-screen">
      <Header />
      <div className="min-h-[calc(100vh-110px)] w-full mt-[54px]">
        <NoteDetails />
      </div>
      <Nav />
    </section>
  );
}
