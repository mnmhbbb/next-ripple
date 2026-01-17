"use client";

import { type ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthSync from "@/shared/providers/auth-sync";
import { getQueryClient } from "@/shared/providers/lib/get-query-client";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthSync />
      {children}
    </QueryClientProvider>
  );
}
