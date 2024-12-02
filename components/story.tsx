"use client";

import { useRef } from "react";
import { Story } from "@/utils/types";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useAudioPlayer } from "@/utils/hooks/useAudioPlayer";

const StoryComp = ({
  id,
  title,
  url,
  score,
  summaryAudio,
  summaryAudioDuration,
  readableTime,
}: Story) => {
  const containerRef = useRef(null);

  const { isPlaying, onPlayPause } = useAudioPlayer({
    id,
    container: containerRef,
    summaryAudio,
    summaryAudioDuration,
  });

  const shortDate = new Date(readableTime).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <li>
      <article
        className={clsx(
          "w-full border rounded-xl p-4 sm:p-6 grid gap-2 shadow-sm",
          isPlaying && "bg-emerald-50 text-emerald-900"
        )}
      >
        <h4 className={"font-bold text-balance"}>
          <a
            className="ml-auto"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h4>

        <div ref={containerRef} className="h-8" />

        <div className="flex items-center gap-2 text-sm font-mono">
          <button
            className={clsx(
              "-ml-1 border flex items-center justify-center rounded-full size-7",
              isPlaying ? "bg-emerald-500 text-white border-current" : ""
            )}
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <IconPlayerPauseFilled size={16} />
            ) : (
              <IconPlayerPlayFilled size={16} />
            )}
          </button>

          <span className="opacity-60">Date: {shortDate}</span>
          {/*<span className="opacity-60">Duration: {summaryAudioDuration} seconds</span>*/}
          <a
            className="ml-auto opacity-60"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Points: {score}
          </a>
        </div>
      </article>
    </li>
  );
};

export default StoryComp;
