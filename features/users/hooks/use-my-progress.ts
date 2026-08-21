import { useQuery } from "@tanstack/react-query";

import { getMyProgress } from "../api/users.api";

export function useMyProgress() {
  return useQuery({
    queryKey: ["my-progress"],
    queryFn: getMyProgress,
  });
}