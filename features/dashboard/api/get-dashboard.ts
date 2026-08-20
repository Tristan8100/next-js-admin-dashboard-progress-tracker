import api from "@/lib/axios";
import { DashboardResponse } from "../types/dashboard.types";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await api.get<DashboardResponse>(
    "/dashboard",
  );

  return response.data;
}