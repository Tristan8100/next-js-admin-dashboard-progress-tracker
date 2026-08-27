import { useQuery } from "@tanstack/react-query"

import { getLeaderboard } from "../api/users.api"
import { LeaderboardQuery } from "../types/user.types"

export function useLeaderboard(query?: LeaderboardQuery) {
  return useQuery({
    queryKey: ["leaderboard", query],
    queryFn: () => getLeaderboard(query),
  })
}
