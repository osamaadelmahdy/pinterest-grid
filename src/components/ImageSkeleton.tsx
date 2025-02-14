import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ImageSkeleton() {
  return (
    <Skeleton
      baseColor="#202020"
      highlightColor="#444"
      width={"100%"}
      height={"200px"}
    />
  );
}

export default ImageSkeleton;
