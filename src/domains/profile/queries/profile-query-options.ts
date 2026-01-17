import { queryOptions } from "@tanstack/react-query";

import { getProfileQueryFn } from "@/domains/profile/api";
import { QUERY_KEYS } from "@/shared/constants/query-keys";

/**
 * 프로필 조회를 위한 queryOptions
 * 서버 사이드 prefetch와 클라이언트 사이드 useQuery에서 공통으로 사용
 * @param userId - 프로필 조회할 유저 ID
 * @param isMine - 본인 프로필인지 여부
 * @returns queryOptions 객체
 */
export function profileQueryOptions(userId: string, isMine: boolean = false) {
  return queryOptions({
    queryKey: QUERY_KEYS.profile.byId(userId),
    queryFn: () => getProfileQueryFn(userId, isMine),
    enabled: !!userId,
  });
}
