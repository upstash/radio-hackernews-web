"use client";

import { useEffect, useRef, useState } from "react";

interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  summaryAudio: string;
  readableTime: string; // Added this field
}

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchTopStories() {
      try {
        const response = await fetch("/api/top-stories");
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setError("Failed to load stories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTopStories();
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleAudioToggle = (storyId: number, audioUrl: string) => {
    if (playingAudio === storyId) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      audioRef.current.onended = () => setPlayingAudio(null);
      setPlayingAudio(storyId);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-1 gap-1 sm:p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-1 row-start-2 items-center w-full">
        <h1 className="text-2xl font-bold mb-1">Radio Hackernews</h1>
        <h2 className="text-xl font-bold mb-1">Top 10 Stories</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Time</th>
              {/* New column */}
              <th className="p-2 text-left">Audio</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr
                key={story.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="p-2">
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {story.title}
                  </a>
                </td>
                <td className="p-2">{story.score}</td>
                <td className="p-2">{story.readableTime}</td>
                {/* New cell */}
                <td className="p-2">
                  <button
                    onClick={() =>
                      handleAudioToggle(story.id, story.summaryAudio)
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center justify-center w-20"
                  >
                    {playingAudio === story.id ? (
                      <>
                        <span className="mr-1">‖</span> Pause
                      </>
                    ) : (
                      <>
                        <span className="mr-1">▶</span> Play
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer content remains the same */}
      </footer>
    </div>
  );
}
