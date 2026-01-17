"use client";

import { useActionState } from "react";

import { signInWithPassword } from "@/app/(auth)/sign-in/actions";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithPassword, null);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <Input
        type="email"
        name="email"
        placeholder="example@abc.com"
        required
        disabled={isPending}
      />
      <Input type="password" name="password" placeholder="비밀번호" required disabled={isPending} />
      {state?.error && <div className="text-sm text-red-500">{state.error}</div>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
