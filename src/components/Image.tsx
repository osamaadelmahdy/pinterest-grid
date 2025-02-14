import { memo, useState } from "react";
import ImageSkeleton from "./ImageSkeleton";

function Image({
  image,
}: {
  image: {
    id: number;
    download_url: string;
    author: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {isLoading && <ImageSkeleton />}
      <img
        style={{
          width: "100%",
        }}
        src={image.download_url}
        alt={`Photo by ${image.author}`}
        loading="lazy"
        onLoad={() => {
          setIsLoading(false);
          console.log("loaded");
        }}
      />
    </div>
  );
}

export default memo(Image);
