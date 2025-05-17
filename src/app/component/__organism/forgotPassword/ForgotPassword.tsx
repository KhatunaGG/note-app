"use client";
import { Title } from "../../__molecules";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword = () => {
  // const path = usePathname();
  // const isForgotPassword = path === "/forgot-password";

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[91.46%] md:w-[67.96%] lg:w-[37.5%] bg-white rounded-xl px-4 py-[48px] md:px-8 md:py-[48px] lg:p-[48px] flex flex-col gap-4">
        <Title isForgotPassword={true} />
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default ForgotPassword;