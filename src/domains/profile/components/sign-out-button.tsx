"use client";

import { useEffect } from "react";
import { useActionState } from "react";

import { useRouter } from "next/navigation";

import { signOut } from "@/app/(protected)/profile/actions";

import { Button } from "@/shared/components/ui/button";
import { useSetUserId } from "@/shared/store/user";
import { createClient } from "@/shared/utils/supabase/client";

/**
 * 로그아웃 버튼 컴포넌트
 * 서버 액션을 사용하여 로그아웃 처리 후 클라이언트에서 세션 확인 및 store 업데이트
 */
export default function SignOutButton() {
  const router = useRouter();
  const setUserId = useSetUserId();
  const [state, formAction, isPending] = useActionState(signOut, null);

  // 서버 액션 성공 시 클라이언트에서 세션 확인하여 store 업데이트 후 리다이렉트
  useEffect(() => {
    if (state?.success) {
      const updateSession = async () => {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUserId(session?.user.id ?? null);
      };

      updateSession();
      router.push("/sign-in");
    }
  }, [state, router, setUserId]);

  return (
    <form action={formAction}>
      {state?.error && <div className="text-sm text-red-500 mb-2">{state.error}</div>}
      <Button type="submit" variant={"outline"} className="cursor-pointer" disabled={isPending}>
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </Button>
    </form>
  );
}
