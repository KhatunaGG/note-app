import {
  Aside,
  Header,
  Nav,
  NoteDetails,
  Notes,
} from "@/app/component/__organism";

export default function page() {
  return (
    <div className="w-full flex flex-col items-start relative">
      <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
        <Header />
      </div>

      <div className="w-full t-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex ">
        <div className="w-full lg:w-[24.82%]  pt-[54px] md:pt-0">
          <Notes />
        </div>
        <div className="w-full lg:w-[50.34%] lg:flex hidden  ">
          <NoteDetails />
        </div>
        <div className="w-full lg:w-[22.07%] hidden lg:flex ">
          <Aside />
        </div>
      </div>
      <Nav />
    </div>
  );
}
