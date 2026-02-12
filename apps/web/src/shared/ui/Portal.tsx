"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  containerId?: string; // domyślnie "portal-root"
};

export function Portal({ children, containerId = "portal-root" }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const el = useMemo(() => {
    if (typeof document === "undefined") return null;

    let node = document.getElementById(containerId);
    if (!node) {
      node = document.createElement("div");
      node.id = containerId;
      document.body.appendChild(node);
    }
    return node;
  }, [containerId]);

  if (!mounted || !el) return null;
  return createPortal(children, el);
}
