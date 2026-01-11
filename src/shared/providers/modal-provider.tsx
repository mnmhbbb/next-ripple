"use client";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {typeof window !== "undefined" && createPortal(<></>, document.getElementById("modal-root")!)}
      {children}
    </>
  );
}
