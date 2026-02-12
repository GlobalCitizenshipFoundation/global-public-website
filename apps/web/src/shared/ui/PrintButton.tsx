"use client";

import React from "react";
import { FaPrint } from "react-icons/fa6";

export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <FaPrint aria-hidden={true} />
    </button>
  );
}
