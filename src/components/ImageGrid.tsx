import { ImageData } from "../types/gallery";

interface ImageGridProps {
  images: ImageData[];
}

function ImageGrid({ images }: ImageGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        padding: "16px",
      }}
    >
      {images.map((image) => (
        <div
          key={image.id}
          style={{
            position: "relative" as const,
            paddingBottom: "75%",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <img
            src={image.download_url}
            alt={`Photo by ${image.author}`}
            style={{
              position: "absolute" as const,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover" as const,
            }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
