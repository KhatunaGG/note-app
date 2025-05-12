import { Header, Nav, TagNav } from "@/app/component/__organism";
import React from "react";

export default function page() {
  return (
    <section className="w-full flex flex-col items-start relative min-h-screen">
      <Header />
      <div className="w-full min-h-[calc(100vh-110px)] lg:hidden">
        <TagNav />
      </div>
      <Nav />
    </section>
  );
}




