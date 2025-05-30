import { Header, Nav, TagNav } from "@/app/component/__organism";

export default function page() {
  return (
    <section className="w-full flex flex-col items-start relative min-h-screen justify-between">
      <Header />
      <div className="w-full min-h-[calc(100vh-110px)] lg:hidden px-6 md:px-0">
        <TagNav />
      </div>
      <Nav />
    </section>
  );
}
