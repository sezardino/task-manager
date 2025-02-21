"use client";

import { cn } from "@/utils/shadcn";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import * as React from "react";
import { Button, ButtonProps } from "./button";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export const CopyButton = ({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handler = () => {
    setHasCopied(true);
    copyToClipboard(value);
  };

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className
      )}
      onClick={handler}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
};
