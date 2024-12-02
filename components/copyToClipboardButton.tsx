"use client";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clsx from "clsx";
import { IconCheck, IconClipboard } from "@tabler/icons-react";

export default function CopyToClipboardButton({
  copyText,
  title,
  timeout = 2000,
  className,
}: {
  copyText: string;
  title: string;
  timeout?: number;
  className?: string;
}) {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const copyHandler = () => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, timeout);
  };

  return (
    <CopyToClipboard text={copyText} onCopy={copyHandler}>
      <button
        className={clsx(
          "inline-flex gap-2 font-medium items-center border",
          "hover:bg-emerald-50 text-sm px-3 py-2 rounded-lg",
          className
        )}
      >
        {title}{" "}
        {isCopy ? (
          <IconCheck size={16} className="text-emerald-600" />
        ) : (
          <IconClipboard size={16} />
        )}
      </button>
    </CopyToClipboard>
  );
}
