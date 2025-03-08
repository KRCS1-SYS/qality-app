"use client";

import { LoginForm } from "@/components/login/login-form";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center justify-center">
          <img className="w-56" src="/zuarione.svg" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
