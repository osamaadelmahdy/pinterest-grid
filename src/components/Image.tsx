import { memo, useState } from "react";
import ImageSkeleton from "./ImageSkeleton";

function Image({ url, onLoad }: { url: string; onLoad?: () => void }) {
  //   const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* {isLoading && <ImageSkeleton />} */}
      <img
        style={{
          width: "100%",
        }}
        src={url}
        loading="lazy"
        onLoad={onLoad}
        // onLoad={() => {
        //   setIsLoading(false);
        // }}
      />
    </div>
  );
}

export default Image;
