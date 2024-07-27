import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full">
      <Skeleton className="h-[250px] w-full rounded-none" />
      <div className="md:ml-40 ml-14 mt-20 space-y-4">
        <Skeleton className="h-[50px] w-[272px] pb-4" />
        <div className="flex flex-row gap-2">
          <Skeleton className="h-6 w-[20px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-6 w-[20px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-6 w-[20px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-6 w-[20px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
      </div>
    </div>
  );
}
