import { createClient } from "@/shared/utils/supabase/server";

/**
 * 서버 컴포넌트에서 현재 로그인한 사용자 정보를 가져옵니다.
 * JWT 토큰을 검증하여 신뢰할 수 있는 사용자 정보를 반환합니다.
 * @returns 사용자 정보 (로그인하지 않은 경우 null)
 */
export async function getServerUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * 서버 컴포넌트에서 현재 로그인한 사용자의 ID를 가져옵니다.
 * JWT 토큰을 검증하여 신뢰할 수 있는 사용자 ID를 반환합니다.
 * @returns 사용자 ID (로그인하지 않은 경우 null)
 */
export async function getServerUserId() {
  const user = await getServerUser();
  return user?.id ?? null;
}
