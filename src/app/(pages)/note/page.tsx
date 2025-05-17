// import { Aside, Header, NoteDetails, Notes } from "@/app/component/__organism";
// import React from "react";

// export default function NotePage() {
//   return (
//     <div className="w-full flex flex-col items-start    relative">
//       <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
//         <Header />
//       </div>

//       <div className="w-full t-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex ">
//         <div className="w-full lg:w-[24.82%] ">
//           <Notes />
//         </div>
//         {/* <div className="w-full lg:w-[50.34%] hidden lg:flex  border-r border-r-[#CACFD8]"> */}
//         <div className="w-full lg:w-[50.34%]  lg:flex  border-r border-r-[#CACFD8]">
//           <NoteDetails />
//         </div>
//         <div className="w-full lg:w-[22.07%] hidden lg:flex ">
//           <Aside />
//         </div>
//       </div>
//     </div>
//   );
// }



import { Aside, Header, Nav, NoteDetails, Notes } from "@/app/component/__organism";


export default function NotePage() {
  return (
    <div className="w-full flex flex-col items-start relative">

      <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
        <Header />
      </div>

      <div className="w-full t-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex ">
        <div className="w-full lg:w-[24.82%]  ">
          <Notes />
        </div>
        {/* <div className="w-full lg:w-[50.34%] lg:flex hidden border-r border-r-[#CACFD8]"> */}
        <div className="w-full lg:w-[50.34%] lg:flex hidden border-r border-r-[#CACFD8]">
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