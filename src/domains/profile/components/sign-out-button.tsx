"use client";

import { useEffect } from "react";
import { useActionState } from "react";

import { signOut } from "@/app/(protected)/profile/actions";

import { Button } from "@/shared/components/ui/button";
import { useSetUserId } from "@/shared/store/user";
import { createClient } from "@/shared/utils/supabase/client";

/**
 * 로그아웃 버튼 컴포넌트
 * 서버 액션에서 직접 redirect를 처리하므로 클라이언트에서는 에러만 표시
 * 에러 발생 시 세션을 다시 확인하여 store를 동기화
 */
export default function SignOutButton() {
  const setUserId = useSetUserId();
  const [state, formAction, isPending] = useActionState(signOut, null);

  // 에러 발생 시 세션을 다시 확인하여 store를 동기화
  // (로그아웃 실패 시 세션이 여전히 유효할 수 있음)
  useEffect(() => {
    if (state?.error) {
      const syncSession = async () => {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUserId(session?.user.id ?? null);
      };

      syncSession();
    }
    // 성공 시에는 서버에서 redirect()가 발생하므로 컴포넌트가 언마운트됨
  }, [state, setUserId]);

  return (
    <form action={formAction}>
      {state?.error && <div className="mb-2 text-sm text-red-500">{state.error}</div>}
      <Button type="submit" variant={"outline"} className="cursor-pointer" disabled={isPending}>
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </Button>
    </form>
  );
}
