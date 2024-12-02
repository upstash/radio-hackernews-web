import { Story } from "@/utils/types";
import StoryComp from "./story";
import { getTopStories } from "@/app/actions";

export default async function StoryList() {
  const { data }: { data: Story[] } = await getTopStories();

  const stories = data?.filter((story) => story?.summaryAudio);

  if (stories?.length === 0) {
    return <div>No stories found</div>;
  }

  return (
    <ul className="grid gap-6 pb-20">
      {stories.map((story) => (
        <StoryComp key={story.id} {...story} />
      ))}
    </ul>
  );
}
