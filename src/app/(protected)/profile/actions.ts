"use server";

import { createClient } from "@/shared/utils/supabase/server";

/**
 * 로그아웃 서버 액션
 * Supabase 세션을 종료합니다.
 */
export async function signOut(_prevState: { error?: string; success?: boolean } | null) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  // 성공 시 success 플래그 반환 (redirect는 클라이언트에서 처리)
  return { success: true };
}
