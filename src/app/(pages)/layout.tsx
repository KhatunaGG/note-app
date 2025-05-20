// import { ToastContainer } from "react-toastify";
// import "../globals.css";
// import Sidebar from "../component/__organism/sidebar/Sidebar";
// import Overlay from "../component/__organism/overlay/Overlay";

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className=" w-full min-h-screen flex  lg:bg-white dark:lg:bg-dark relative ">
//       <Overlay />

//       <div className="lg:w-[18.88%] h-full overflow-y-auto">
//         <Sidebar />
//       </div>

//       <div className="w-full lg:w-[81.12%]             bg-light dark:bg-dark  text-black dark:text-light  transition-colors duration-700 ease-in-out">
//         {/* <div className="w-full  lg:flex ">{children}</div> */}
//         <div className="w-full  lg:flex ">{children}</div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }


import { ToastContainer } from "react-toastify";
import "../globals.css";
import Sidebar from "../component/__organism/sidebar/Sidebar";
import Overlay from "../component/__organism/overlay/Overlay";
import { Providers } from "../theme/ThemeProvider ";
import ThemeSwitch from "../component/__organism/themeSwitch/ThemeSwitch";



export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <ThemeSwitch />
      <div className="w-full min-h-screen flex bg-secondary-light dark:bg-secondary-dark text-primary-light dark:text-primary-dark transition-colors duration-300 ">
      {/* <div className="w-full min-h-screen flex bg-white dark:bg-[#232530] transition-colors duration-300"> */}
        <Overlay />

        <div className="lg:w-[18.88%] h-full overflow-y-auto ">
          <Sidebar />
        </div>

        <div className="w-full lg:w-[81.12%]">
          <div className="w-full lg:flex">{children}</div>
        </div>

        <ToastContainer />
      </div>
    </Providers>
  );
}
