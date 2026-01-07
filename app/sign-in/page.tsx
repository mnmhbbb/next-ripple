import { SignInForm } from "@/features/auth/ui/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-2xl font-bold">로그인</div>

      <SignInForm />

      <div className="flex flex-col gap-2">
        <a className="text-muted-foreground hover:underline" href="/sign-up">
          아직 회원이 아니신가요? 회원가입하기
        </a>
        <a className="text-muted-foreground hover:underline" href="/forget-password">
          비밀번호를 잊으셨나요? 비밀번호 재설정하기
        </a>
      </div>
    </div>
  );
}
