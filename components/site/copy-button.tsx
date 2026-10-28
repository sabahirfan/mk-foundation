"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Copies a value such as a sort code or payment reference. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the value stays visible to copy by hand.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-ink hover:bg-rule-tint",
          className,
        )}
      >
        {copied ? <CheckIcon className="size-4 text-redpen" aria-hidden /> : <CopyIcon className="size-4" aria-hidden />}
        {copied ? "Copied" : "Copy"}
        <span className="sr-only"> {label}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied` : ""}
      </span>
    </>
  );
}
