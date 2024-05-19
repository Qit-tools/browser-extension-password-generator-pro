export default function Skeleton() {
  return (
    <div role="status">
      {[
        "w-1/3",
        "w-1/2",
        "w-3/4",
        "w-3/5",
        "w-1/5",
        "w-5/6",
        "w-1/3",
        "w-1/4",
        "w-1/6",
        "w-2/5",
      ].map((width, index) => (
        <div
          key={`skeleton-${index}`}
          class={`h-2 rounded-full bg-slate-300 dark:bg-slate-600 ${width} mb-2.5 animate-pulse`}
        />
      ))}
      <span class="sr-only">Loading...</span>
    </div>
  );
}
