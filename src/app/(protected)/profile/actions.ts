"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/shared/utils/supabase/server";

/**
 * 로그아웃 서버 액션
 * Supabase 세션을 종료하고 로그인 페이지로 리다이렉트합니다.
 */
export async function signOut(_prevState: { error?: string } | null) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  // 성공 시 서버에서 직접 리다이렉트
  // 이렇게 하면 클라이언트 컴포넌트가 언마운트되기 전에 리다이렉트가 처리됨
  redirect("/sign-in");
}
