"use client";

import { useEffect, useState } from "react";
import StoryComp from "@/components/story";
import { getTopStories } from "@/app/actions";
import { Story } from "@/utils/types";

export default function Home() {
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

  return (
    <div className="max-w-screen-sm mx-auto px-8 py-16">
      <main className="">
        <h1 className="text-3xl font-bold">Radio Hackernews</h1>
        <h2 className="text-xl opacity-60">Recent Top Stories</h2>

        <div className="mt-8 grid gap-6">
          {stories.map((story) => (
              story.summaryAudio ?
            <StoryComp
              key={story.id}
              {...story}
              activeId={activeId}
              onChangeActiveId={setActiveId}
            />
                  : null
          ))}

          {/*<StoryComp
            id={"3434"}
            title={
              "Nobel Prize in Physics Awarded for Machine Learning and Neural Networks"
            }
            url={
              "https://fly.storage.tigris.dev/radio-hackernews/audio/41718030_1727918222021_summary.mp3"
            }
            summaryAudio="dasda"
            readableTime="dasd"
            score={4.3}
          />*/}
        </div>
      </main>
    </div>
  );
}
