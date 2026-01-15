import { useQuery } from "@tanstack/react-query";

import { getProfileQueryFn } from "@/domains/profile/api";
import { QUERY_KEYS } from "@/shared/constants/query-keys";

/**
 * 프로필 데이터를 조회하는 훅
 * @param userId - 프로필 조회할 유저 ID
 * @param isMine - 본인 프로필인지 여부 (서버에서 계산된 값)
 */
export default function useProfileData(userId?: string, isMine: boolean = false) {
  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: () => getProfileQueryFn(userId!, isMine),
    enabled: !!userId, // enabled가 false일 때는 queryFn이 실행되지 않기 때문에 queryKey와 queryFn에서 userId 타입을 단언함
  });
}
