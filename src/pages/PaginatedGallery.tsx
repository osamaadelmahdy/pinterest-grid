import { useState } from "react";
import { usePaginatedImages } from "../hooks/usePaginatedImages";
import Pagination from "../components/Pagination";
import LimitSelector from "../components/LimitSelector";
import ImageSkeleton from "../components/ImageSkeleton";
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
            padding: "16px",
          }}
        >
          {Array.from({ length: limit }, (_, i) => i + 1).map((i) => (
            <div key={i}>
              <ImageSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <ImageGrid images={images || []} />
      )}

      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}

export default PaginatedGallery;
