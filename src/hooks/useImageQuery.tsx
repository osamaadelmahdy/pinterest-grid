import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../services/api";

const ITEMS_PER_PAGE = 10;

export function useImageQuery() {
  return useInfiniteQuery<
    {
      id: number;
      author: string;
      download_url: string;
      height: number;
      width: number;
    }[]
  >({
    queryKey: ["images"],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchImages({
        page: pageParam as number,
        limit: ITEMS_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE
        ? allPages.length + 1
        : undefined;
    },
  });
}
