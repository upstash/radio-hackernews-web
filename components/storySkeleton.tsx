export function StorySkeleton() {
  return (
    <div className="w-full border rounded-xl p-4 sm:p-6 grid gap-2 shadow-sm">
      <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse" />

      <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />

      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse ml-auto" />
      </div>
    </div>
  );
}

export const StorySkeletonList = () => {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <StorySkeleton key={index} />
      ))}
    </div>
  );
};
