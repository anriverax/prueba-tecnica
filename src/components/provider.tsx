"use client";

import React, { PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Cambiamos el nombre de la función a mayúscula para que sea un componente de React válido
export default function Provider({ children }: PropsWithChildren) {
  const router = useRouter();

  // Usamos una función de flecha para evitar problemas con 'this'
  const handleNavigate = (href: string) => router.push(href);

  return <NextUIProvider navigate={handleNavigate}>{children}</NextUIProvider>;
}
