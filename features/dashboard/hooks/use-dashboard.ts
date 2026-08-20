import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../api/get-dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}