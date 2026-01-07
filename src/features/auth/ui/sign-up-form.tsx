"use client";

import { useActionState } from "react";

import { signUp } from "app/sign-up/actions";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, null);

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
        {isPending ? "회원가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
