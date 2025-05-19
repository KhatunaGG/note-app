// "use client";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Title } from "../../__molecules";
// import SignInForm from "../signInForm/SignInForm";

// const SignIn = () => {
//   const path = usePathname();
//   const isSignInPage = path === "/sign-in";

//   return (
//     <section className="w-full min-h-screen flex items-center justify-center">
//       <div className="w-[91.46%] md:w-[67.96%] lg:w-[37.5%] bg-white rounded-xl px-4 py-[48px] md:px-8 md:py-[48px] lg:p-[48px] flex flex-col gap-4">
//         <Title isSignInPage={true} />
//         <SignInForm isSignInPage={isSignInPage} />
//         <div className="w-full flex items-center justify-center gap-2">
//           <p className="text-sm font-normal text-[#525866]">No account yet?</p>
//           <Link href={"/sign-up"}>
//             <p className="text-sm font-bold text-[#525866] cursor-pointer hover:underline transition-transform duration-300 ease-in-out hover:scale-105">
//               Sign Up
//             </p>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Title } from "../../__molecules";
import SignInForm from "../signInForm/SignInForm";
import { Suspense } from "react";

const SignIn = () => {
  const path = usePathname();
  const isSignInPage = path === "/sign-in";

  return (
    <section className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[91.46%] md:w-[67.96%] lg:w-[37.5%] bg-white rounded-xl px-4 py-[48px] md:px-8 md:py-[48px] lg:p-[48px] flex flex-col gap-4">
        {/* <Title isSignInPage={true} /> */}
        <Title isSignInPage={isSignInPage} />
        <Suspense fallback={<div>Loading form...</div>}>
          <SignInForm isSignInPage={isSignInPage} />
        </Suspense>
        <div className="w-full flex items-center justify-center gap-2">
          <p className="text-sm font-normal text-[#525866]">No account yet?</p>
          <Link href={"/sign-up"}>
            <p className="text-sm font-bold text-[#525866] cursor-pointer hover:underline transition-transform duration-300 ease-in-out hover:scale-105">
              Sign Up
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
