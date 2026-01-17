"use client";

import { useActionState } from "react";

import { signInWithPassword } from "@/app/(auth)/sign-in/actions";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithPassword, null);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        placeholder="example@abc.com"
        required
        disabled={isPending}
      />
      <input type="password" name="password" placeholder="비밀번호" required disabled={isPending} />
      {state?.error && <div className="text-sm text-red-500">{state.error}</div>}
      <button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
