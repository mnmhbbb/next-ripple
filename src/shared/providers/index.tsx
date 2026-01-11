"use client";

import { type ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/shared/providers/lib/get-query-client";
import ModalProvider from "@/shared/providers/modal-provider";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
}
