import api from "@/lib/axios";

import {
  AnalyticsQuery,
  AnalyticsResponse,
} from "../types/analytics.types";

export async function getAnalytics(
  query?: AnalyticsQuery,
) {
  const response = await api.get<AnalyticsResponse>(
    "/dashboard/analytics",
    {
      params: query,
    },
  );

  return response.data;
}