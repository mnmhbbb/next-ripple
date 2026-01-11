import { type ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/shared/utils/supabase/server";

export default async function GlobalLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ripple sns의 로고, 물결을 타는 ripple 아이콘"
              className="h-8 rounded-full"
              width={32}
              height={32}
            />
            <div className="font-bold">ripple sns</div>
          </Link>
          <div className="flex items-center gap-2">
            {user ? <span>{user.email}</span> : <Link href="/sign-in">로그인</Link>}
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">{children}</main>
      <footer className="text-muted-foreground border-t py-10 text-center">@mnmhbbb</footer>
    </div>
  );
}
