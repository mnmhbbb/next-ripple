"use server";

import { createClient } from "@/shared/utils/supabase/server";

export async function signInWithPassword(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // 성공 시 success 플래그 반환 (redirect는 클라이언트에서 처리)
  return { success: true };
}
