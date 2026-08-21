import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "../api/get-analytics";
import { AnalyticsQuery } from "../types/analytics.types";

export function useAnalytics(
  query?: AnalyticsQuery,
) {
  return useQuery({
    queryKey: ["analytics", query],
    queryFn: () => getAnalytics(query),
  });
}