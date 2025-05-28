"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignInStore } from "@/app/store/sign-in.store";
import { AnimateSpin } from "../../__molecules";

const Dashboard = () => {
  const { accessToken, initialize, isLoading } = useSignInStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (accessToken) {
      router.replace("/note");
    }
  }, [accessToken, router]);

  if (isLoading || !accessToken) {
    return <AnimateSpin />;
  }
  if (!accessToken) return null;

  return null;
};

export default Dashboard;
