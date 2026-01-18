"use client";

import { useEffect } from "react";

import { useSetUserId } from "@/shared/store/user";
import { createClient } from "@/shared/utils/supabase/client";

/**
 * 인증 상태를 zustand store에 동기화하는 컴포넌트
 * - 앱 최초 로드 시 현재 세션을 확인하여 store에 저장
 * - 로그인/로그아웃 시 자동으로 store 상태 업데이트
 */
export default function AuthSync() {
  const setUserId = useSetUserId();

  useEffect(() => {
    const supabase = createClient();

    // 최초 로드 시 세션 확인 및 store에 저장
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user.id ?? null);
    };

    initSession();
  }, [setUserId]);

  return null;
}
