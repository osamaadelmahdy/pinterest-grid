import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useMemo } from "react";

export function useGalleryVirtualizer(data: any, hasNextPage: boolean) {
  const allImages = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);

  const estimateSize = useCallback(
    (index: number) => {
      const image = allImages[index];
      return image?.height || 300;
    },
    [allImages]
  );

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allImages.length + 1 : allImages.length,
    estimateSize,
    overscan: 10,
  });

  return { virtualizer, allImages };
}
