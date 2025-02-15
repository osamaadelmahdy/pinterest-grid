import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchImages } from "../services/api";
import { ImageData } from "../types/gallery";

export function usePaginatedImages(page: number, limit: number) {
  return useQuery<ImageData[]>({
    queryKey: ["images", page, limit],
    queryFn: () => fetchImages({ page, limit }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
