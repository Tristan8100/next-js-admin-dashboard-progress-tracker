import { useQuery } from "@tanstack/react-query";

import { verifyUser } from "../api/verify-user";

export function useVerifyUser() {
  return useQuery({
    queryKey: ["verify-user"],
    queryFn: verifyUser,
  });
}