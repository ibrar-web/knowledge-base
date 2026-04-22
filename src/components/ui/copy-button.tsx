"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  value: string;
};

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Button variant="secondary" onClick={onCopy}>
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
