import { ToastContainer } from "react-toastify";
import "../globals.css";
import Sidebar from "../component/__organism/sidebar/Sidebar";
import Overlay from "../component/__organism/overlay/Overlay";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full min-h-screen flex  lg:bg-white dark:lg:bg-dark relative ">
      <Overlay />

      <div className="lg:w-[18.88%] h-full overflow-y-auto">
        <Sidebar />
      </div>

      <div className="w-full lg:w-[81.12%]   bg-violet-300 dark:bg-[#232530]  text-black dark:text-white  transition-colors duration-700 ease-in-out">
        {/* <div className="w-full  lg:flex ">{children}</div> */}
        <div className="w-full  lg:flex ">{children}</div>
      </div>
      <ToastContainer />
    </div>
  );
}


//bg-violet-300 dark:bg-[#232530]