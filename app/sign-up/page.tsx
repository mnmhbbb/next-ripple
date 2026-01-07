import { SignUpForm } from "@/features/auth/ui/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold">회원가입</div>

      <SignUpForm />

      <div className="flex flex-col gap-2">
        <a className="text-muted-foreground hover:underline" href="/sign-in">
          이미 회원이신가요? 로그인하기
        </a>
      </div>
    </div>
  );
}
