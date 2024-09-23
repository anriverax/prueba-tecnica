"use client";

import React, { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// We change the name of the function to uppercase so that it is a valid React component
export default function Provider({ children }: PropsWithChildren) {
  const router = useRouter();

  // We use an arrow function to avoid problems with 'this'
  const handleNavigate = (href: string) => router.push(href);

  return <NextUIProvider navigate={handleNavigate}>{children}</NextUIProvider>;
}
