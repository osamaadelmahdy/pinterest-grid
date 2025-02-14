import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SkeletonComponent from "./SkeletonComponent";
import MasonryLayout from "./MasonryLayout";
import Image from "./Image";
import LoadMoreBtn from "./LoadMoreBtn";

function Gallery() {
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    {
      id: number;
      author: string;
      download_url: string;
    }[]
  >({
    queryKey: ["images"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageParam}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
  const debouncedFetch = useDebouncedCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, 1000);

  if (isLoading) {
    return (
      <MasonryLayout>
        <SkeletonComponent />
      </MasonryLayout>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <MasonryLayout>
        {data?.pages.map((images) =>
          images?.map((image) => <Image image={image} key={image.id} />)
        )}
      </MasonryLayout>
      <LoadMoreBtn onClick={debouncedFetch} isLoading={isFetchingNextPage} />
    </div>
  );
}

export default Gallery;
