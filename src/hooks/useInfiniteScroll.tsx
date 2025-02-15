import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Virtualizer } from "@tanstack/react-virtual";

type UseInfiniteScroll = {
  virtualizer: Virtualizer<Window, Element>;
  allImages: ImageData[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export function useInfiniteScroll({
  virtualizer,
  allImages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScroll) {
  const debouncedFetch = useDebouncedCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, 300);

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allImages.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      debouncedFetch();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allImages.length,
    isFetchingNextPage,
    virtualizer.getVirtualItems(),
  ]);

  return { debouncedFetch };
}
