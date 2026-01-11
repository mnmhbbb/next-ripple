import { getRandomNickname } from "@/domains/profile/utils";
import { createClient } from "@/shared/utils/supabase/server";

/**
 * 프로필 조회
 * @param userId - 프로필 조회할 유저 ID
 * @returns 프로필 데이터
 */
export async function fetchProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profile").select("*").eq("id", userId).single();

  if (error) throw error;
  return data;
}

/**
 * 프로필 생성
 * @param userId - 프로필 생성할 유저 ID
 * @returns 생성된 프로필 데이터
 */
export async function createProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
