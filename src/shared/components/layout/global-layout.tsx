import { type ReactNode } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { profileQueryOptions } from "@/domains/profile/queries";
import Header from "@/shared/components/layout/header";
import { getQueryClient } from "@/shared/providers/lib/get-query-client";
import { getServerUserId } from "@/shared/utils/supabase/auth";

export default async function GlobalLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  const userId = await getServerUserId();

  // 로그인한 유저의 프로필 데이터 prefetch
  if (userId) {
    await queryClient.prefetchQuery(profileQueryOptions(userId, true));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">{children}</main>
        <footer className="text-muted-foreground border-t py-10 text-center">@mnmhbbb</footer>
      </div>
    </HydrationBoundary>
  );
}
