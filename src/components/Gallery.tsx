import SkeletonComponent from "./SkeletonComponent";
import MasonryLayout from "./MasonryContainer";
import Image from "./Image";
import LoadMoreBtn from "./LoadMoreBtn";
import { useImageQuery } from "../hooks/useImageQuery";
import { useGalleryVirtualizer } from "../hooks/useGalleryVirtualizer";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import VirtualContainer from "./VirtualContainer";
import MasonryContainer from "./MasonryContainer";

function Gallery() {
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useImageQuery();

  const { virtualizer, allImages } = useGalleryVirtualizer(data, hasNextPage);

  const { debouncedFetch } = useInfiniteScroll({
    virtualizer,
    allImages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

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
    <>
      <VirtualContainer virtualizer={virtualizer}>
        <MasonryContainer>
          {virtualizer?.getVirtualItems()?.map((virtualItem) => {
            const image = allImages[virtualItem.index];
            if (!image) {
              return isFetchingNextPage ? (
                <div key="loading" style={{ height: 300 }}>
                  Loading more...
                </div>
              ) : null;
            }
            return (
              <div key={image.id}>
                <Image
                  url={image?.download_url}
                  onLoad={() => virtualizer.measure()}
                />
              </div>
            );
          })}
        </MasonryContainer>
      </VirtualContainer>

      <LoadMoreBtn onClick={debouncedFetch} isLoading={isFetchingNextPage} />
    </>
  );
}

export default Gallery;
