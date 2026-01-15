import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getProfileQueryFn } from "@/domains/profile/api";
import ProfileInfo from "@/domains/profile/components/profile-info";
import { QUERY_KEYS } from "@/shared/constants/query-keys";
import { getQueryClient } from "@/shared/providers/lib/get-query-client";
import { createClient } from "@/shared/utils/supabase/server";

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  // 현재 인증된 사용자 정보 가져오기
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 본인 프로필인지 판단
  const isMine = user?.id === userId;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: () => getProfileQueryFn(userId!, isMine),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileInfo userId={userId} isMine={isMine} />
      </HydrationBoundary>
    </>
  );
}
