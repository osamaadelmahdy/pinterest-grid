import { useState } from "react";
import { usePaginatedImages } from "../hooks/usePaginatedImages";
import Pagination from "../components/Pagination";
import LimitSelector from "../components/LimitSelector";
import Skeleton from "react-loading-skeleton";
import ImageGrid from "../components/ImageGrid";

function PaginatedGallery() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: images, isLoading, error } = usePaginatedImages(page, limit);

  if (error) {
    return <div>Error loading images: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <h1>Image Paginated Gallery</h1>
        <LimitSelector
          value={limit}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <Skeleton count={limit} />
      ) : (
        <ImageGrid images={images || []} />
      )}

      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}

export default PaginatedGallery;
