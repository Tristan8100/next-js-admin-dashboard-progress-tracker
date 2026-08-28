"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { clearUser } from "@/lib/redux/slices/auth.slice";

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    router.replace("/auth/login");
  };

  return { logout };
}
