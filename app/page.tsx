import CopyToClipboardButton from "@/components/copyToClipboardButton";
import StoryList from "@/components/storyList";
import { Suspense } from "react";
import { StorySkeletonList } from "@/components/storySkeleton";

export default async function Home() {
  return (
    <main className="max-w-screen-sm mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold">Radio Hackernews</h1>
      <h2 className="text-xl opacity-60">
        Audio Recap of Top Hackernews Stories
      </h2>

      <CopyToClipboardButton
        copyText="https://radio-hackernews-web.vercel.app/api/podcast"
        title="Copy Podcast Feed URL"
        className="mt-4"
      />

      <div className="mt-8">
        <Suspense fallback={<StorySkeletonList />}>
          <StoryList />
        </Suspense>
      </div>
    </main>
  );
}
