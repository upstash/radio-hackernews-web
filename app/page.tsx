"use client";

import { useEffect, useState } from "react";
import StoryComp from "@/components/story";
import { getTopStories } from "@/app/actions";
import { Story } from "@/utils/types";
import { IconCheck, IconClipboard } from "@tabler/icons-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clsx from "clsx";

export default function Home() {
  const [copy, isCopy] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTopStories() {
    try {
      const { data } = await getTopStories();
      setStories(data);
    } catch (error) {
      setError("Failed to load stories. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTopStories();
  }, []);

  useEffect(() => {
    if (copy) {
      const id = setTimeout(() => {
        isCopy(false);
      }, 2000);

      return () => clearTimeout(id);
    }
  }, [copy]);

  return (
    <main className="max-w-screen-sm mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold">Radio Hackernews</h1>
      <h2 className="text-xl opacity-60">
        Audio Recap of Top Hackernews Stories
      </h2>

      <CopyToClipboard
        text="https://radio-hackernews-web.vercel.app/api/podcast"
        onCopy={() => isCopy(true)}
      >
        <button
          className={clsx(
            "inline-flex gap-2 font-medium items-center mt-4 border",
            "hover:bg-emerald-50 text-sm px-3 py-2 rounded-lg",
          )}
        >
          Copy Podcast Feed URL{" "}
          {copy ? (
            <IconCheck size={16} className="text-emerald-600" />
          ) : (
            <IconClipboard size={16} />
          )}
        </button>
      </CopyToClipboard>

      <div className="mt-8 grid gap-6">
        {stories.map((story) =>
          story.summaryAudio ? (
            <StoryComp
              key={story.id}
              {...story}
              activeId={activeId}
              onChangeActiveId={setActiveId}
            />
          ) : null,
        )}
      </div>
    </main>
  );
}
