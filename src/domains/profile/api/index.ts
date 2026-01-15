"use server";

/**
 * 프로필 관련 서버 액션
 */

import { getRandomNickname } from "@/domains/profile/utils";
import { createClient } from "@/shared/utils/supabase/server";

import type { PostgrestError } from "@supabase/supabase-js";

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

/**
 * 프로필 조회를 위한 queryFn
 * 서버 사이드 prefetch와 클라이언트 사이드 useQuery에서 공통으로 사용
 * 기본적으로 프로필 조회를 하되, 나의 프로필이며 데이터가 존재하지 않을 경우 새로운 프로필 생성함
 * @param userId - 프로필 조회할 유저 ID
 * @param isMine - 본인 프로필인지 여부
 * @returns 프로필 데이터
 */
export async function getProfileQueryFn(userId: string, isMine: boolean = false) {
  try {
    const profile = await fetchProfile(userId);
    return profile;
  } catch (error) {
    // 나의 프로필 조회이며 데이터가 존재하지 않을 경우 새로운 프로필 생성
    // (Supabase 에러 코드: PGRST116 = 데이터가 존재하지 않음)
    if (isMine && (error as PostgrestError).code === "PGRST116") {
      return await createProfile(userId);
    }
    throw error;
  }
}
