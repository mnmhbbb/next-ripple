import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col items-center justify-center gap-2">
      <Link
        className="w-full rounded-md bg-blue-500 p-2 text-center text-white transition-colors duration-300 hover:bg-blue-600"
        href="/sign-in"
      >
        로그인
      </Link>
      <Link
        className="w-full rounded-md bg-green-500 p-2 text-center text-white transition-colors duration-300 hover:bg-green-600"
        href="/sign-up"
      >
        회원가입
      </Link>
    </div>
  );
}
